import React, { useState, useEffect } from 'react';
import './StudentsSectionMaterial.css';

const StudentsSectionMaterial = (props) => {
  const tokenData = props.message;
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching study resources for AIAPGET preparation from an API or database
    setTimeout(() => {
      setResources([
        { id: 1, title: 'Homeopathic Philosophy - Law of Similars', type: 'PDF', link: '/path/to/homeopathic-philosophy.pdf' },
        { id: 2, title: 'Materia Medica: Remedies and Indications', type: 'Video', link: 'https://www.youtube.com/watch?v=homeopathy-video' },
        { id: 3, title: 'Repertory: Mastering Repertorization', type: 'PDF', link: '/path/to/repertory-guide.pdf' },
        { id: 4, title: 'AIAPGET Sample Questions', type: 'PDF', link: '/path/to/aiapget-sample-questions.pdf' },
        { id: 5, title: 'Case-Taking Techniques in Homeopathy', type: 'Web Article', link: 'https://www.homeopathy.com/article/case-taking' },
        { id: 6, title: 'Common Homeopathic Remedies for Acute Conditions', type: 'PDF', link: '/path/to/remedies-acute-conditions.pdf' },
        { id: 7, title: 'Repertory Charts: A Visual Guide', type: 'PDF', link: '/path/to/repertory-charts.pdf' }
      ]);
      setLoading(false);
    }, 1500); // Simulate network delay
  }, []);

  const handleViewResource = (link) => {
    // Open resource in a new tab or handle accordingly
    window.open(link, '_blank');
  };

  return (
    <div className="students-section-material">
      <h2>AIAPGET Homeopathy Preparation Resources</h2>
      {loading ? (
        <div className="loading">Loading resources...</div>
      ) : (
        <div className="resources-list">
          {resources.map((resource) => (
            <div key={resource.id} className="resource-item">
              <h3>{resource.title}</h3>
              <p>Type: {resource.type}</p>
              <button onClick={() => handleViewResource(resource.link)}>View Resource</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentsSectionMaterial;
