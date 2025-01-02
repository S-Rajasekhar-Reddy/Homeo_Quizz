import React, { useState, useEffect } from 'react';
import './Grades.css';

const Grades = () => {
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching quiz results from an API
    setTimeout(() => {
      setQuizResults([
        { quizName: 'Math Quiz 1', score: 85, date: '2024-12-15', status: 'Passed' },
        { quizName: 'History Quiz 1', score: 72, date: '2024-12-10', status: 'Passed' },
        { quizName: 'Science Quiz 1', score: 58, date: '2024-11-30', status: 'Failed' },
        { quizName: 'Computer Science Quiz 1', score: 90, date: '2024-11-20', status: 'Passed' }
      ]);
      setLoading(false);
    }, 1500); // Simulate network delay
  }, []);

  return (
    <div className="grades">
      <h2>Quiz Results</h2>
      {loading ? (
        <div className="loading">Loading grades...</div>
      ) : (
        <table className="grades-table">
          <thead>
            <tr>
              <th>Quiz</th>
              <th>Score</th>
              <th>Status</th>
              <th>Date Completed</th>
            </tr>
          </thead>
          <tbody>
            {quizResults.map((result, index) => (
              <tr key={index}>
                <td>{result.quizName}</td>
                <td>{result.score}%</td>
                <td className={result.status === 'Passed' ? 'passed' : 'failed'}>
                  {result.status}
                </td>
                <td>{result.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Grades;
