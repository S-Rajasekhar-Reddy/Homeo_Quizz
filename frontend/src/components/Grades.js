import React, { useState, useEffect } from 'react';
import './Grades.css';

const Grades = (props) => {
  const tokenData = props.message;
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noGrades, setNoGrades] = useState(false);

  useEffect(() => {
    // Simulate fetching quiz results from an API
    setTimeout(() => {
      if (props.message.params.length === 0) {
        setNoGrades(true);
      } else {
        setQuizResults(props.message.params.quizData);
      }
      setLoading(false);
    }, 800); // Simulate network delay
  }, []);

  return (
    <div className="grades">
      {loading ? (
        <div className="loading">Loading grades...</div>
      ) : ( noGrades ? (
          <div className="loading">No grades available</div>
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
                  <td className={result.status === 'Pass' ? 'passed' : 'failed'}>
                    {result.status}
                  </td>
                  <td>{result.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
    </div>
  );
};

export default Grades;
