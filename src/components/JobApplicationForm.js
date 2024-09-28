// src/components/JobApplicationForm.js

import React, { useState } from 'react';

const JobApplicationForm = ({ addApplication }) => {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create application object with current date and default status
    const newApplication = {
      company,
      position,
      date: new Date().toLocaleDateString(), // Automatically add current date
      status: 'Applied', // Default status
    };
    // Call the addApplication function passed as prop
    addApplication(newApplication);
    // Reset form fields
    setCompany('');
    setPosition('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Company:</label>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Position:</label>
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Application</button>
    </form>
  );
};

export default JobApplicationForm;