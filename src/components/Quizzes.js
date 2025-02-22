import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import './Quizzes.css';

const Quizzes = (props) => {
  const tokenData = props.message;
  const [isCreatingQuiz, setIsCreatingQuiz] = useState(false);
  const [isShowingQuizzes, setIsShowingQuizzes] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [quizName, setQuizName] = useState('');
  const [quizList, setQuizList] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(null);
  const [editQuestionIndex, setEditQuestionIndex] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState('');
  const [editedOptions, setEditedOptions] = useState(['', '', '', '']);
  const [editedCorrectAnswer, setEditedCorrectAnswer] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleQuizNameChange = (e) => {
    setQuizName(e.target.value);
  };


  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    if (!question || options.some(option => option === '') || !correctAnswer) {
      alert('Please fill in all fields');
      return;
    }

    const updatedQuizzes = [...quizzes];
    const quizIndex = updatedQuizzes.findIndex(quiz => quiz.quizName === currentQuiz);
    if (quizIndex !== -1) {
      const questionObject = {
        question,
        correctAnswer
      };
      
      // Dynamically assign options as options1, options2, etc.
      options.forEach((option, index) => {
        questionObject[`option${index + 1}`] = option;
      });
      
      // Push the object to the question list
      updatedQuizzes[quizIndex].questionList.push(questionObject);
    }

    setQuizzes(updatedQuizzes);
    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
  };

  const handleQuizCreate = () => {
    if (!quizName) {
      alert('Please enter a quiz name');
      return;
    }

    // Check if a quiz with the same name already exists
    const existingQuiz = quizzes.find(quiz => quiz.quizName.toLowerCase() === quizName.toLowerCase());
    if (existingQuiz) {
      alert('A quiz with this name already exists. Please choose a different name.');
      return;
    }

    const newQuiz = {
      quizName: quizName,
      questionList: [],
    };

    setQuizzes([...quizzes, newQuiz]);
    setQuizName('');
    setCurrentQuiz(quizName);
    setIsCreatingQuiz(true);
  };

  const handleQuizClose = async () => {
    setIsCreatingQuiz(false);
    setCurrentQuiz(null);
    try {
      const response = await fetch(`${apiUrl}/createQuiz`, { // change the database address to prod
        method: "POST",
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
          'Authorization': `Bearer ${tokenData}`
        },
        body: JSON.stringify(quizzes[0]),
      });
      
      if (!response.ok) {
        // If the response status is not ok (e.g., 400 or 401), throw an error
        throw new Error("No database Connection. Please try again.");
      }

    } catch (err) {
      console.error("Database Connection failed", err);
    }

  };

  const handleQuizClick = async (quizName, index) => {
    try {
      const response = await fetch(`${apiUrl}/getQuizes/`+quizName, { // change the database address to prod
        method: "GET",
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
          'Authorization': `Bearer ${tokenData}`
        }
      });
      
      if (!response.ok) {
        // If the response status is not ok (e.g., 400 or 401), throw an error
        throw new Error("No database Connection. Please try again.");
      }

      const rawQuizData = await response.json();
      rawQuizData.forEach((quiz) => {
        quizList[index].questionList.push({
        question: quiz.Question,
        correctAnswer: decryptAnswer(quiz.Correct_Answer),
        options: [quiz.Option1, quiz.Option2, quiz.Option3, quiz.Option4]})
      });
      
      setSelectedQuizIndex(selectedQuizIndex === index ? null : index); // Toggle quiz visibility


    } catch (err) {
      console.error("Database Connection failed", err);
    }

  };

  function decryptAnswer(text){
      const bytes  = CryptoJS.AES.decrypt(text, process.env.REACT_APP_SECRET_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
  };

  const handleEditQuestion = (quizIndex, questionIndex) => {
    const quiz = quizList[quizIndex];
    const questionToEdit = quiz.questionList[questionIndex];

    setEditQuestionIndex(questionIndex);
    setEditedQuestion(questionToEdit.question);
    setEditedOptions(questionToEdit.options);
    setEditedCorrectAnswer(questionToEdit.correctAnswer);
  };

  const handleSaveEditedQuestion = async (quizIndex, questionIndex, quizName) => {
    if (!editedQuestion || editedOptions.some(option => option === '') || !editedCorrectAnswer) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const updatedQuizzes = [...quizList];
      const quiz = updatedQuizzes[quizIndex];
      quiz.questionList[questionIndex] = {
        question: editedQuestion,
        options: editedOptions,
        correctAnswer: editedCorrectAnswer,
      };

      const response = await fetch(`${apiUrl}/updateQuiz`, { // change the database address to prod
        method: "POST",
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
          'Authorization': `Bearer ${tokenData}`
        },
        body: JSON.stringify({
          quizName: quizName,
          question: editedQuestion,
          option1: editedOptions[0],
          option2: editedOptions[1],
          option3: editedOptions[2],
          option4: editedOptions[3],
          correctAnswer: editedCorrectAnswer,
          questionNumber: questionIndex+1}),
      });
      
      if (!response.ok) {
        // If the response status is not ok (e.g., 400 or 401), throw an error
        throw new Error("No database Connection. Please try again.");
      }

      setQuizzes(updatedQuizzes);
      setEditQuestionIndex(null);
      setEditedQuestion('');
      setEditedOptions(['', '', '', '']);
      setEditedCorrectAnswer('');

    } catch (err) {
      console.error("Database Connection failed", err);
    }
  };


  const handleShowQuizClick = async () => {
    try {
      const response = await fetch(`${apiUrl}/getQuizes`, { // change the database address to prod
        method: "GET",
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
          'Authorization': `Bearer ${tokenData}`
        }
      });
      
      if (!response.ok) {
        // If the response status is not ok (e.g., 400 or 401), throw an error
        throw new Error("No database Connection. Please try again.");
      }

      const rawQuizData = await response.json();
      const transformedQuizData = rawQuizData.map(quiz => ({
        quizName: quiz.Quiz_Name,
        questionList: []
      }));
      setQuizList(transformedQuizData);
      setIsShowingQuizzes(!isShowingQuizzes);

    } catch (err) {
      console.error("Database Connection failed", err);
    }
  };

  return (
    <div className="quizzes-container">
      <button onClick={() => setIsCreatingQuiz(!isCreatingQuiz)} className="create-quiz-button">
        {isCreatingQuiz ? 'Close Create Quiz' : 'Create Quiz'}
      </button>
      <button onClick={handleShowQuizClick} className="show-quiz-button">
        {isShowingQuizzes ? 'Close Existing Quizzes' : 'Show Existing Quizzes'}
      </button>

      {/* Show the quiz creation form if isCreatingQuiz is true */}
      {isCreatingQuiz && (
        <div className="quiz-form-container">
          <h2>Create a New Quiz</h2>
          {!currentQuiz && (
            <div className="form-group">
              <label htmlFor="quizName">Quiz Name:</label>
              <input
                type="text"
                id="quizName"
                value={quizName}
                onChange={handleQuizNameChange}
                placeholder="Enter quiz name"
                required
              />
              <button onClick={handleQuizCreate}>Create Quiz</button>
            </div>
          )}

          {currentQuiz && (
            <div>
              <h3>Adding Questions to {currentQuiz}</h3>
              <form onSubmit={handleSubmitQuestion}>
                <div className="form-group">
                  <label htmlFor="question">Question:</label>
                  <input
                    type="text"
                    id="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Enter your question"
                    required
                  />
                </div>

                {options.map((option, index) => (
                  <div key={index} className="form-group">
                    <label htmlFor={`option${index + 1}`}>Option {index + 1}:</label>
                    <input
                      type="text"
                      id={`option${index + 1}`}
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`Enter option ${index + 1}`}
                      required
                    />
                  </div>
                ))}

                <div className="form-group">
                  <label htmlFor="correctAnswer">Correct Answer:</label>
                  <select
                    id="correctAnswer"
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                    required
                  >
                    <option value="">Select Correct Answer</option>
                    {options.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <button type="submit">Add Question</button>
              </form>
              <button onClick={handleQuizClose}>Save Quiz</button>
            </div>
          )}
        </div>
      )}

      {/* Show the list of existing quizzes if isShowingQuizzes is true */}
      {isShowingQuizzes && (
        <div className="quiz-list-container">
          <h3>Existing Quizzes</h3>
          {quizList.length > 0 ? (
            quizList.map((quiz, index) => (
              <div key={index} className="quiz-preview-item">
                <h4 onClick={() => handleQuizClick(quiz.quizName, index)} className="quiz-name">
                  {quiz.quizName}
                </h4>

                {selectedQuizIndex === index && (
                  <ul>
                    {quiz.questionList.map((quizQuestion, idx) => (
                      <li key={idx}>
                        <h5>{quizQuestion.question}</h5>
                        <ul>
                          {quizQuestion.options.map((option, oIdx) => (
                            <li key={oIdx}>{option}</li>
                          ))}
                        </ul>
                        <p>Correct Answer: {quizQuestion.correctAnswer}</p>
                        <button onClick={() => handleEditQuestion(index, idx)}>Edit Question</button>
                        {editQuestionIndex === idx && (
                          <div>
                            <h5>Edit Question</h5>
                            <input
                              type="text"
                              value={editedQuestion}
                              onChange={(e) => setEditedQuestion(e.target.value)}
                            />
                            {editedOptions.map((option, oIdx) => (
                              <input
                                key={oIdx}
                                type="text"
                                value={option}
                                onChange={(e) => {
                                  const updatedOptions = [...editedOptions];
                                  updatedOptions[oIdx] = e.target.value;
                                  setEditedOptions(updatedOptions);
                                }}
                                placeholder={`Option ${oIdx + 1}`}
                              />
                            ))}
                            <select
                              value={editedCorrectAnswer}
                              onChange={(e) => setEditedCorrectAnswer(e.target.value)}
                            >
                              <option value="">Select Correct Answer</option>
                              {editedOptions.map((option, oIdx) => (
                                <option key={oIdx} value={option}>{option}</option>
                              ))}
                            </select>
                            <button onClick={() => handleSaveEditedQuestion(index, idx, quiz.quizName)}>Save Edits</button>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          ) : (
            <p>No quizzes created yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Quizzes;
