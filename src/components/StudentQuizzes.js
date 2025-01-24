import React, { useState } from 'react';
import './StudentQuizzes.css';

const StudentQuizzes = (props) => {
  const tokenData = props.message;
  const [quizzes, setQuizzes] = useState([
    {
      title: "React Basics",
      description: "Test your knowledge of React fundamentals.",
      questions: [
        {
          questionText: "What is React?",
          options: ["A library", "A framework", "A database", "A language"],
          correctAnswer: "A library",
        },
        {
          questionText: "What hook is used for state in React?",
          options: ["useEffect", "useState", "useContext", "useReducer"],
          correctAnswer: "useState",
        },
      ],
    },
    {
      title: "JavaScript Essentials",
      description: "Test your knowledge of basic JavaScript concepts.",
      questions: [
        {
          questionText: "Which method is used to add an element at the end of an array?",
          options: ["push()", "pop()", "shift()", "unshift()"],
          correctAnswer: "push()",
        },
        {
          questionText: "What does 'NaN' stand for in JavaScript?",
          options: ["Not a Number", "New Array", "No Array", "Not Null"],
          correctAnswer: "Not a Number",
        },
      ],
    },
  ]);

  const [currentQuizIndex, setCurrentQuizIndex] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const startQuiz = (index) => {
    setCurrentQuizIndex(index);
    setAnswers(new Array(quizzes[index].questions.length).fill(''));
    setQuizCompleted(false);
    setScore(0);
  };

  const handleAnswerChange = (e, questionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = e.target.value;
    setAnswers(updatedAnswers);
  };

  const submitQuiz = () => {
    const correctAnswers = quizzes[currentQuizIndex].questions.map(
      (question, index) => question.correctAnswer === answers[index]
    );
    const totalScore = correctAnswers.filter(Boolean).length;
    setScore(totalScore);
    setQuizCompleted(true);
  };

  const closeQuiz = () => {
    setQuizCompleted(false); // Reset the quizCompleted state
    setCurrentQuizIndex(null); // Reset the current quiz index
  };

  return (
    <div className="student-quizzes">
      {/* Dynamic Heading */}
      <h2>{quizCompleted ? "Results" : "Available Quizzes"}</h2>

      {quizzes.length === 0 ? (
        <div className="no-quizzes">
          <p>No quizzes available right now. Stay tuned for upcoming challenges!</p>
        </div>
      ) : currentQuizIndex === null ? (
        <ul className="quiz-list">
          {quizzes.map((quiz, index) => (
            <li key={index} className="quiz-item">
              <h3>{quiz.title}</h3>
              <p>{quiz.description}</p>
              <button
                className="start-quiz-btn"
                onClick={() => startQuiz(index)}
              >
                Start Quiz
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="quiz-taking">
          <h3>{quizzes[currentQuizIndex].title}</h3>
          {!quizCompleted ? (
            <>
              <form>
                {quizzes[currentQuizIndex].questions.map((question, index) => (
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
              <p>Your score: {score} / {quizzes[currentQuizIndex].questions.length}</p>
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
