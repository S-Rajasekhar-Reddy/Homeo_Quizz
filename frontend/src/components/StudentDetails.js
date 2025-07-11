import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './StudentDetails.css';

const StudentDetails = () => {
  const { id } = useParams(); // Get student id from URL params
  const navigate = useNavigate();

  const students = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      lastAttemptScore: '85%',
      avgScore: '80%',
      quizAttempts: 5,
      passFail: 'Passed',
      status: 'Approved',
      quizzes: [
        {
          attemptNumber: 1,
          name: 'Math Quiz',
          questions: [
            { question: "What is 2+2?", answer: "4", feedback: "Good performance" },
            { question: "What is the capital of France?", answer: "Paris", feedback: "Good performance" }
          ],
          score: 80,
        },
        {
          attemptNumber: 2,
          name: 'Geography Quiz',
          questions: [
            { question: "What is 3+3?", answer: "6", feedback: "Well done" },
            { question: "What is the capital of Italy?", answer: "Rome", feedback: "Well done" }
          ],
          score: 90,
        },
      ],
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      lastAttemptScore: '90%',
      avgScore: '85%',
      quizAttempts: 4,
      passFail: 'Passed',
      status: 'Approved',
      quizzes: [
        {
          attemptNumber: 1,
          name: 'Science Quiz',
          questions: [
            { question: "What is H2O?", answer: "Water", feedback: "Excellent" },
            { question: "What is the boiling point of water?", answer: "100°C", feedback: "Good" }
          ],
          score: 95,
        }
      ],
    },
    // Add more students here...
  ];

  // Find the student based on the `id` from the URL
  const student = students.find((student) => student.id === parseInt(id));

  if (!student) {
    return <h2>Student not found</h2>;
  }

  const [expandedQuiz, setExpandedQuiz] = useState(null); // Track which quiz is expanded
  const [isQuizListVisible, setIsQuizListVisible] = useState(false); // State to toggle quiz list visibility
  const [saveStatus, setSaveStatus] = useState('Save Feedback'); // Track save status of feedback
  const [feedbackChanged, setFeedbackChanged] = useState(false); // Track if feedback has been changed

  const handleQuizAttemptsClick = () => {
    setIsQuizListVisible((prevState) => !prevState); // Toggle quiz list visibility
  };

  const handleQuizNameClick = (quiz) => {
    if (expandedQuiz && expandedQuiz.attemptNumber === quiz.attemptNumber) {
      setExpandedQuiz(null); // Close the quiz if already expanded
    } else {
      setExpandedQuiz(quiz); // Expand the clicked quiz
    }
  };

  const handleFeedbackChange = (index, event) => {
    const updatedQuiz = { ...expandedQuiz };
    updatedQuiz.questions[index].feedback = event.target.value;
    setExpandedQuiz(updatedQuiz);
    setFeedbackChanged(true); // Mark feedback as changed
    setSaveStatus('Save Feedback'); // Reset the button text to "Save Feedback"
  };

  const handleSaveFeedback = () => {
    setSaveStatus('Saved'); // Change the button text to "Saved"
    setFeedbackChanged(false); // Feedback has been saved, reset change flag
  };

  const handleCloseQuizDetails = () => {
    setExpandedQuiz(null);
    setIsQuizListVisible(false); // Close quiz list when closing quiz details
  };

  return (
    <div className="student-details">
      <div className="details-header">
        <h2>Student Details</h2>
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      </div>
      <div className="details-content">
        <div className="detail-item"><strong>Name:</strong> {student.name}</div>
        <div className="detail-item"><strong>Email:</strong> {student.email}</div>
        <div className="detail-item"><strong>Last Attempt Score:</strong> {student.lastAttemptScore}</div>
        <div className="detail-item"><strong>Average Score:</strong> {student.avgScore}</div>
        <div className="detail-item"><strong>Quiz Attempts:</strong>
          <span
            style={{ cursor: 'pointer', color: 'blue' }}
            onClick={handleQuizAttemptsClick}
          >
            {student.quizAttempts}
          </span>
        </div>
        <div className="detail-item"><strong>Pass/Fail:</strong> {student.passFail}</div>
        <div className="detail-item"><strong>Status:</strong> {student.status}</div>
      </div>

      {isQuizListVisible && student.quizzes.length > 0 && (
        <div className="quiz-details">
          <h3>Quiz Attempts</h3>
          {student.quizzes.map((quiz, index) => (
            <div key={index} className="quiz-card" style={{ marginBottom: '15px' }}>
              <div
                className="quiz-name"
                style={{ cursor: 'pointer', fontWeight: 'bold' }}
                onClick={() => handleQuizNameClick(quiz)}
              >
                <span>{index + 1}. {quiz.name}</span>
              </div>

              {/* Conditionally render quiz details when the quiz is expanded */}
              {expandedQuiz && expandedQuiz.attemptNumber === quiz.attemptNumber && (
                <div className="quiz-attempt-details" style={{ marginTop: '10px' }}>
                  <h4>{quiz.name} - Attempt {quiz.attemptNumber}</h4>
                  <p><strong>Score:</strong> {quiz.score}%</p>
                  <div className="questions">
                    {quiz.questions.map((question, index) => (
                      <div key={index}>
                        <p><strong>{question.question}</strong></p>
                        <p>Answer: {question.answer}</p>
                      </div>
                    ))}
                  </div>
                  <div className="feedback-section">
                    <textarea
                      placeholder="Instructor Feedback"
                      value={expandedQuiz.questions[0].feedback || ''}
                      onChange={(e) => handleFeedbackChange(0, e)}
                      rows="4"
                    />
                  </div>
                  <div className="quiz-actions">
                    <button 
                      onClick={handleSaveFeedback} 
                      className="save-button"
                      disabled={!feedbackChanged} // Disable button if no feedback change
                    >
                      {saveStatus}
                    </button>
                    <button onClick={handleCloseQuizDetails} className="close-button">Close</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
