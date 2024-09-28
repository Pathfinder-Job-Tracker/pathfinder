// src/App.js

import React, { useState, useEffect } from 'react';
import JobApplicationForm from './components/JobApplicationForm';
import { uploadApplicationsToS3, loadApplicationsFromS3 } from './s3Storage';

const App = () => {
  const [applications, setApplications] = useState([]);

  // Load applications from S3 on component mount
  useEffect(() => {
    const fetchApplications = async () => {
      const storedApplications = await loadApplicationsFromS3();
      setApplications(storedApplications);
    };

    fetchApplications();
  }, []);

  // Save applications to S3 whenever it changes
  useEffect(() => {
    const uploadApplications = async () => {
      await uploadApplicationsToS3(applications);
    };

    uploadApplications();
  }, [applications]);

  const addApplication = (application) => {
    setApplications((prevApplications) => [
      ...prevApplications,
      application,
    ]);
  };

  const updateStatus = (index, newStatus) => {
    const updatedApplications = applications.map((app, i) =>
      i === index ? { ...app, status: newStatus } : app
    );
    setApplications(updatedApplications);
  };

  return (
    <div>
      <h1>Job Applications</h1>
      <JobApplicationForm addApplication={addApplication} />
      <ul>
        {applications.map((app, index) => (
          <li key={index}>
            <strong>{app.company}</strong> - {app.position} | {app.date} | 
            <select
              value={app.status}
              onChange={(e) => updateStatus(index, e.target.value)}
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;