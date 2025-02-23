import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import './StudentQuizzes.css';

const StudentQuizzes = (props) => {
  const studentData = props.message;
  const [quizList, setQuizList] = useState(props.message.params.quizList);

  const [currentQuizIndex, setCurrentQuizIndex] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const apiUrl = process.env.REACT_APP_API_URL;

  const startQuiz = async (index) => {

    try {
      const response = await fetch(`${apiUrl}/getQuizes/`+quizList[index].quizName, { // change the database address to prod
        method: "GET",
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
          'Authorization': `Bearer ${studentData.tokenData}`
        }
      });

      if (!response.ok) {
        // If the response status is not ok (e.g., 400 or 401), throw an error
        throw new Error("No database Connection. Please try again.");
      }
      
      const rawData = await response.json();
      const questionList = rawData.map((eachQuestion) => {
          return {
            questionText: eachQuestion.Question,
            options: [eachQuestion.Option1, eachQuestion.Option2, eachQuestion.Option3, eachQuestion.Option4],
            correctAnswer: decryptAnswer(eachQuestion.Correct_Answer)
          };
      });
      quizList[index].questions = questionList;
      setQuizList([...quizList]);
      setCurrentQuizIndex(index);
      setAnswers(new Array(quizList[index].questions.length).fill(''));
      setQuizCompleted(false);
      setScore(0);

    } catch (err) {
      console.error("Database Connection failed", err);
    }
  };

  function decryptAnswer(text){
    const bytes  = CryptoJS.AES.decrypt(text, process.env.REACT_APP_SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  const handleAnswerChange = (e, questionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = e.target.value;
    setAnswers(updatedAnswers);
  };

  const submitQuiz = async () => {
    const correctAnswers = quizList[currentQuizIndex].questions.map(
      (question, index) => question.correctAnswer === answers[index]
    );
    const totalScore = (correctAnswers.filter(Boolean).length * 4) - (quizList[currentQuizIndex].questions.length - correctAnswers.filter(Boolean).length);
    const query = quizList[currentQuizIndex].remattempt === 0 ? 'studentQuizSubmit' : 'retakeQuizSubmit';
    try {
      const response = await fetch(`${apiUrl}/`+query, { // change the database address to prod
        method: "POST",
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
          'Authorization': `Bearer ${studentData.tokenData}`
        },
        body: JSON.stringify({
          studentId: studentData.params.id,
          userName: studentData.params.userName,
          fullName: studentData.params.fullName,
          quizNumber: quizList[currentQuizIndex].quizId,
          quizName: quizList[currentQuizIndex].quizName,
          grade: totalScore,
          maxGrade: quizList[currentQuizIndex].questions.length,
          date: new Date()
        })
      });

      if (!response.ok) {
        // If the response status is not ok (e.g., 400 or 401), throw an error
        throw new Error("No database Connection. Please try again.");
      }
      const rawData = await response.json();
      setScore(totalScore);
      setQuizCompleted(true);

    } catch (err) {
      console.error("Database Connection failed", err);
    } 
  };

  const closeQuiz = () => {
    const updatedQuizList = [...quizList.slice(0, currentQuizIndex), ...quizList.slice(currentQuizIndex+1)];
    setQuizList(updatedQuizList); // Remove the completed quiz from the quiz list 
    setQuizCompleted(false); // Reset the quizCompleted state
    setCurrentQuizIndex(null); // Reset the current quiz index
  };

  return (
    <div className="student-quizzes">
      {/* Dynamic Heading */}
      <h2>{quizCompleted ? "Results" : "Available Quizzes"}</h2>

      {quizList.length === 0 ? (
        <div className="no-quizzes">
          <p>No quizzes available right now. Stay tuned for upcoming challenges!</p>
        </div>
      ) : currentQuizIndex === null ? (
        <ul className="quiz-list">
          {quizList.map((quiz, index) => (
            <li key={quiz.quizId} className="quiz-item">
              <p>{quiz.quizName}</p>
              <button
                className="start-quiz-btn"
                onClick={() => startQuiz(index)}
              >
                {quiz.remattempt === 0 ? 'Start Quiz' : 'Retake Quiz'}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="quiz-taking">
          <h3>{quizList[currentQuizIndex].quizName}</h3>
          {!quizCompleted ? (
            <>
              <form>
                {quizList[currentQuizIndex].questions.map((question, index) => (
                  <div key={index} className="question">
                    <p>{question.questionText}</p>
                    <div className="options">
                      {question.options.map((option, optionIndex) => (
                        <label key={optionIndex}>
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={option}
                            checked={answers[index] === option}
                            onChange={(e) => handleAnswerChange(e, index)}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="submit-quiz-btn"
                  onClick={submitQuiz}
                >
                  Submit Quiz
                </button>
              </form>
            </>
          ) : (
            <div className="quiz-result">
              <h4>Quiz Completed!</h4>
              <p>Your score: {score} / {quizList[currentQuizIndex].questions.length}</p>
              <button className="close-quiz-btn" onClick={closeQuiz}>
                Close Quiz
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentQuizzes;
