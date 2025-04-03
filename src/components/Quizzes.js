import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import './Quizzes.css';

const Quizzes = (props) => {
  const tokenData = props.message;
  const [quizzes, setQuizzes] = useState([]);
  const [quizList, setQuizList] = useState([]);
  const [quizName, setQuizName] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(null);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
  const [isCreatingQuiz, setIsCreatingQuiz] = useState(false);
  const [isViewingQuizzes, setIsViewingQuizzes] = useState(false);
  const [editedQuestions, setEditedQuestions] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
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
      const questionObject = { question, correctAnswer };
      options.forEach((option, index) => {
        questionObject[`option${index + 1}`] = option;
      });
      updatedQuizzes[quizIndex].questionList.push(questionObject);
    }
    setQuizzes(updatedQuizzes);
    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
  };

  const handleQuizCreate = () => {
    if (!quizName) return alert('Please enter a quiz name');
    if (quizzes.find(quiz => quiz.quizName.toLowerCase() === quizName.toLowerCase())) {
      return alert('Quiz already exists');
    }
    const newQuiz = { quizName, questionList: [] };
    setQuizzes([...quizzes, newQuiz]);
    setQuizName('');
    setCurrentQuiz(newQuiz.quizName);
  };

  const handleQuizClose = async () => {
    setCurrentQuiz(null);
    setIsCreatingQuiz(false);
    try {
      await fetch(`${apiUrl}/createQuiz`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenData}`
        },
        body: JSON.stringify(quizzes[quizzes.length - 1])
      });
    } catch (err) {
      console.error("Database Connection failed", err);
    }
  };

  const handleShowQuizClick = async () => {
    try {
      const response = await fetch(`${apiUrl}/getQuizes`, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenData}`
        }
      });
      const rawQuizData = await response.json();
      const transformed = rawQuizData.map(quiz => ({ quizName: quiz.Quiz_Name, questionList: [] }));
      setQuizList(transformed);
      setIsViewingQuizzes(true);
      setSelectedQuizIndex(null);
      setSelectedQuestionIndex(null);
    } catch (err) {
      console.error("Database Connection failed", err);
    }
  };

  const handleQuizClick = async (quizName, index) => {
    try {
      const response = await fetch(`${apiUrl}/getQuizes/${quizName}`, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenData}`
        }
      });
      const rawQuizData = await response.json();
      const updatedList = [...quizList];
      updatedList[index].questionList = rawQuizData.map(q => ({
        question: q.Question,
        correctAnswer: decryptAnswer(q.Correct_Answer),
        options: [q.Option1, q.Option2, q.Option3, q.Option4]
      }));
      setQuizList(updatedList);
      setEditedQuestions(updatedList[index].questionList);
      setSelectedQuizIndex(index);
      setSelectedQuestionIndex(null);
      if (updatedList[index].questionList.length === 0) {
        setCurrentQuiz(quizName);
        setIsCreatingQuiz(true);        
        setIsViewingQuizzes(false);    
      }
    } catch (err) {
      console.error("Database Connection failed", err);
    }
  };

  const decryptAnswer = (text) => {
    const bytes = CryptoJS.AES.decrypt(text, process.env.REACT_APP_SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const handleEditChange = (index, field, value) => {
    const updated = [...editedQuestions];
    if (field === 'question' || field === 'correctAnswer') {
      updated[index][field] = value;
    } else {
      updated[index].options[field] = value;
    }
    setEditedQuestions(updated);
  };

  const handleSaveEditedQuestion = async (idx) => {
    const quiz = quizList[selectedQuizIndex];
    const q = editedQuestions[idx];
    await fetch(`${apiUrl}/updateQuiz`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenData}`
      },
      body: JSON.stringify({
        quizName: quiz.quizName,
        question: q.question,
        option1: q.options[0],
        option2: q.options[1],
        option3: q.options[2],
        option4: q.options[3],
        correctAnswer: q.correctAnswer,
        questionNumber: idx + 1
      })
    });
    setSelectedQuestionIndex(null);
  };

  const handleDeleteQuestion = async (idx) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;

    const quiz = quizList[selectedQuizIndex];
    await fetch(`${apiUrl}/deleteQuizQuestion`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenData}`
      },
      body: JSON.stringify({ quizName: quiz.quizName, questionNumber: idx + 1 })
    });
    const updated = [...editedQuestions];
    updated.splice(idx, 1);
    setEditedQuestions(updated);
    if (updated.length === 0 || idx >= updated.length) {
      setSelectedQuestionIndex(null);
    } else {
      setSelectedQuestionIndex(idx === 0 ? 0 : idx - 1);
    }
  };

  const handleDeleteQuiz = async () => {
    if (!window.confirm("Are you sure you want to delete this entire quiz?")) return;

    const quiz = quizList[selectedQuizIndex];
    await fetch(`${apiUrl}/deleteQuiz`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenData}`
      },
      body: JSON.stringify({ quizName: quiz.quizName })
    });
    const updatedList = quizList.filter((_, i) => i !== selectedQuizIndex);
    setQuizList(updatedList);
    setSelectedQuizIndex(null);
  };

  return (
    <div className="quizzes-container">
      <div className="tab-nav">
        <button onClick={() => setIsCreatingQuiz(true)}>Create Quiz</button>
        <button onClick={handleShowQuizClick}>Existing Quizzes</button>
      </div>

      {selectedQuestionIndex !== null && editedQuestions[selectedQuestionIndex] && (
        <div className="quiz-form-popup">
          <div className="quiz-form-container">
            <button onClick={() => setSelectedQuestionIndex(null)} style={{ position: 'absolute', top: '5px', right: '10px', fontSize: '16px', background: 'transparent', border: 'none', color: '#555', cursor: 'pointer', padding: '4px', lineHeight: '1', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', transition: 'background 0.2s ease-in-out' }}>&times;</button>
            <h3>Edit Question</h3>
            <div className="form-group">
           <label>Question</label>
         <input
         type="text"
         value={editedQuestions[selectedQuestionIndex].question}
         onChange={(e) => handleEditChange(selectedQuestionIndex, 'question', e.target.value)}
          />
        </div>

{editedQuestions[selectedQuestionIndex].options.map((opt, i) => (
  <div className="form-group" key={i}>
    <label>Option {i + 1}</label>
    <input
      type="text"
      value={opt}
      onChange={(e) => handleEditChange(selectedQuestionIndex, i, e.target.value)}
    />
  </div>
))}

<div className="form-group">
  <label>Correct Answer</label>
  <select
    value={editedQuestions[selectedQuestionIndex].correctAnswer}
    onChange={(e) => handleEditChange(selectedQuestionIndex, 'correctAnswer', e.target.value)}
  >
    <option value="">Select</option>
    {editedQuestions[selectedQuestionIndex].options.map((opt, i) => (
      <option key={i} value={opt}>
        {opt}
          </option>
            ))}
            </select>
            </div>

            <div className="button-row">
            <button onClick={() => handleSaveEditedQuestion(selectedQuestionIndex)}>Save</button>
            <button onClick={() => handleDeleteQuestion(selectedQuestionIndex)}>Delete</button>
            <button onClick={() => setSelectedQuestionIndex(null)}>Back</button>
          </div>
          </div>
        </div>
      )}

      {isCreatingQuiz && (
        <div className="quiz-form-popup">
          <div className="quiz-form-container">
            <button onClick={() => setIsCreatingQuiz(false)} style={{ position: 'absolute', top: '5px', right: '10px', fontSize: '16px', background: 'transparent', border: 'none', color: '#555', cursor: 'pointer', padding: '4px', lineHeight: '1', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', transition: 'background 0.2s ease-in-out' }}>&times;</button>
            <h2>Create a New Quiz</h2>
            {!currentQuiz && (
              <div className="form-group">
                <label>Quiz Name:</label>
                <input type="text" value={quizName} onChange={(e) => setQuizName(e.target.value)} />
                <button onClick={handleQuizCreate}>Create Quiz</button>
              </div>
            )}
            {currentQuiz && (
              <form onSubmit={handleSubmitQuestion}>
                <div className="form-group">
                  <label>Question:</label>
                  <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
                </div>
                {options.map((option, index) => (
                  <div className="form-group" key={index}>
                    <label>Option {index + 1}:</label>
                    <input type="text" value={option} onChange={(e) => handleOptionChange(index, e.target.value)} />
                  </div>
                ))}
                <div className="form-group">
                  <label>Correct Answer:</label>
                  <select value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)}>
                    <option value="">Select</option>
                    {options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div className="button-row">
                  <button type="submit">Add</button>
                  <button type="button" onClick={handleQuizClose}>Save Quiz</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {isViewingQuizzes && selectedQuizIndex === null && (
        <div className="quiz-form-popup">
          <div className="quiz-form-container">
            <button onClick={() => setIsViewingQuizzes(false)} style={{ position: 'absolute', top: '5px', right: '10px', fontSize: '16px', background: 'transparent', border: 'none', color: '#555', cursor: 'pointer', padding: '4px', lineHeight: '1', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', transition: 'background 0.2s ease-in-out' }}>&times;</button>
            <h2>Existing Quizzes</h2>
            {quizList.length === 0 ? (
              <p style={{ textAlign: 'center' }}><em>No quizzes created yet. Start your first one and make learning fun! 🎉</em></p>
            ) : (
              quizList.map((quiz, index) => (
                <div key={index} className="quiz-preview-item">
                  <h4 className="quiz-name" onClick={() => handleQuizClick(quiz.quizName, index)}>{quiz.quizName}</h4>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {isViewingQuizzes && selectedQuizIndex !== null && selectedQuestionIndex === null && (
        <div className="quiz-form-popup">
          <div className="quiz-form-container">
            <button onClick={() => setSelectedQuizIndex(null)} style={{ position: 'absolute', top: '5px', right: '10px', fontSize: '16px', background: 'transparent', border: 'none', color: '#555', cursor: 'pointer', padding: '4px', lineHeight: '1', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', transition: 'background 0.2s ease-in-out' }}>&times;</button>
            <h2>{quizList[selectedQuizIndex]?.quizName}</h2>

            {editedQuestions.length === 0 ? (
            <div className="empty-state">
          <p><em>This quiz has no questions yet.</em></p>
          <button
            onClick={() => {
            setCurrentQuiz(quizList[selectedQuizIndex].quizName);
            setIsCreatingQuiz(true);
            setIsViewingQuizzes(false);
          }}
          >
          Add Your First Question
          </button>
          </div>
            ) : (
            editedQuestions.map((q, idx) => (
            <div
            key={idx}
            className="question-preview"
            onClick={() => setSelectedQuestionIndex(idx)}
            style={{ cursor: 'pointer' }}
            >
            <h5>{q.question}</h5>
            </div>
            ))
            )}

            <div className="button-row">
              <button onClick={handleDeleteQuiz}>Delete Quiz</button>
              <button onClick={() => setSelectedQuizIndex(null)}>Back</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quizzes;