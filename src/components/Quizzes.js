import React, { useState } from 'react';
import './Quizzes.css'; // Make sure to import the CSS file

const QuizForm = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [quizzes, setQuizzes] = useState([]);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question || options.some(option => option === '') || !correctAnswer) {
      alert('Please fill in all fields');
      return;
    }

    setQuizzes([
      ...quizzes,
      {
        question,
        options,
        correctAnswer
      }
    ]);

    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
  };

  return (
    <div className="quiz-form-container">
      <h2>Create a New Quiz</h2>
      <form onSubmit={handleSubmit}>
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

      <div className="quiz-preview">
        <h3>Quiz Preview</h3>
        {quizzes.length > 0 ? (
          quizzes.map((quiz, index) => (
            <div key={index} className="quiz-preview-item">
              <div className="quiz-preview-item-header">
                <h4>{quiz.question}</h4>
                <span className="correct-answer">Correct Answer: {quiz.correctAnswer}</span>
              </div>
              <ul className="quiz-options">
                {quiz.options.map((option, idx) => (
                  <li key={idx} className={quiz.correctAnswer === option ? 'correct' : ''}>
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No quizzes created yet.</p>
        )}
      </div>
    </div>
  );
};

export default QuizForm;
