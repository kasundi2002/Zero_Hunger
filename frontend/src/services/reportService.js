// services/reportService.js
// This file will be responsible for 
// interacting with the backend. You 
// will make HTTP requests to the API 
// endpoints using fetch or an HTTP 
// client like axios.

import axios from 'axios';

const API_URL = 'http:/192.168.8.169:5000/api/reports'; // Replace with your backend URL

// Create a report
export const createReport = async (reportData) => {
  try {
    const response = await axios.post(`${API_URL}`, reportData);
    return response.data;
  } catch (error) {
    console.error('Error creating report:', error);
    throw error;
  }
};

// Get all reports
export const getAllReports = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error;
  }
};

// Get a report by ID
export const getReportById = async (reportId) => {
  try {
    const response = await axios.get(`${API_URL}/${reportId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching report:', error);
    throw error;
  }
};
