// src/s3Storage.js

import { s3 } from './awsConfig';

const BUCKET_NAME = 'pathfinder-tracker'; // Your bucket name

// Upload applications to S3
export const uploadApplicationsToS3 = async (applications) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: 'applications.json', // Name of the file in S3
    Body: JSON.stringify(applications),
    ContentType: 'application/json'
  };

  try {
    await s3.putObject(params).promise();
    console.log('Applications uploaded successfully');
  } catch (error) {
    console.error('Error uploading applications:', error);
  }
};

// Load applications from S3
export const loadApplicationsFromS3 = async () => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: 'applications.json'
  };

  try {
    const data = await s3.getObject(params).promise();
    const applications = JSON.parse(data.Body.toString('utf-8'));
    return applications;
  } catch (error) {
    console.error('Error loading applications:', error);
    return [];
  }
};