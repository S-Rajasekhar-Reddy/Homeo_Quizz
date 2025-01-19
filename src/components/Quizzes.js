import React, { useState } from 'react';
import './Quizzes.css';

const Quizzes = () => {
  const [isCreatingQuiz, setIsCreatingQuiz] = useState(false);
  const [isShowingQuizzes, setIsShowingQuizzes] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [quizName, setQuizName] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(null);
  const [editQuestionIndex, setEditQuestionIndex] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState('');
  const [editedOptions, setEditedOptions] = useState(['', '', '', '']);
  const [editedCorrectAnswer, setEditedCorrectAnswer] = useState('');
  const [editedQuizName, setEditedQuizName] = useState('');

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleQuizNameChange = (e) => {
    setQuizName(e.target.value);
  };

  const handleQuizEditNameChange = (e) => {
    setEditedQuizName(e.target.value);
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
    console.log(quizzes[0]);
    try {
      const response = await fetch("http://localhost:4000/createQuiz", { // change the database address to prod
        method: "POST",
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizzes[0]),
      });
      
      if (!response.ok) {
        // If the response status is not ok (e.g., 400 or 401), throw an error
        throw new Error("No database Connection. Please try again.");
      }

      alert('Success');

    } catch (err) {
      setSuccess(false);
      console.error("Database Connection failed", err);
    }

  };

  const handleQuizClick = (index) => {
    setSelectedQuizIndex(selectedQuizIndex === index ? null : index); // Toggle quiz visibility
  };

  const handleEditQuestion = (quizIndex, questionIndex) => {
    const quiz = quizzes[quizIndex];
    const questionToEdit = quiz.questionList[questionIndex];

    setEditQuestionIndex(questionIndex);
    setEditedQuestion(questionToEdit.question);
    setEditedOptions(questionToEdit.options);
    setEditedCorrectAnswer(questionToEdit.correctAnswer);
  };

  const handleSaveEditedQuestion = (quizIndex, questionIndex) => {
    if (!editedQuestion || editedOptions.some(option => option === '') || !editedCorrectAnswer) {
      alert('Please fill in all fields');
      return;
    }

    const updatedQuizzes = [...quizzes];
    const quiz = updatedQuizzes[quizIndex];
    quiz.questionList[questionIndex] = {
      question: editedQuestion,
      options: editedOptions,
      correctAnswer: editedCorrectAnswer,
    };

    setQuizzes(updatedQuizzes);
    setEditQuestionIndex(null);
    setEditedQuestion('');
    setEditedOptions(['', '', '', '']);
    setEditedCorrectAnswer('');
  };

  const handleDeleteQuiz = (quizIndex) => {
    const updatedQuizzes = quizzes.filter((_, index) => index !== quizIndex);
    setQuizzes(updatedQuizzes);
  };

  const handleSaveEditedQuizName = (quizIndex) => {
    const updatedQuizzes = [...quizzes];
    updatedQuizzes[quizIndex].name = editedQuizName;
    setQuizzes(updatedQuizzes);
    setEditedQuizName('');
  };

  return (
    <div className="quizzes-container">
      <button onClick={() => setIsCreatingQuiz(!isCreatingQuiz)} className="create-quiz-button">
        {isCreatingQuiz ? 'Close Create Quiz' : 'Create Quiz'}
      </button>
      <button onClick={() => setIsShowingQuizzes(!isShowingQuizzes)} className="show-quiz-button">
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
          {quizzes.length > 0 ? (
            quizzes.map((quiz, index) => (
              <div key={index} className="quiz-preview-item">
                <h4 onClick={() => handleQuizClick(index)} className="quiz-name">
                  {quiz.quizName}
                </h4>
                <button onClick={() => handleDeleteQuiz(index)}>Delete Quiz</button>
                <button onClick={() => setEditedQuizName(quiz.quizName)}>Edit Name</button>
                {editedQuizName && (
                  <div>
                    <input
                      type="text"
                      value={editedQuizName}
                      onChange={handleQuizEditNameChange}
                    />
                    <button onClick={() => handleSaveEditedQuizName(index)}>Save Name</button>
                  </div>
                )}
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
                            <button onClick={() => handleSaveEditedQuestion(index, idx)}>Save Edits</button>
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
