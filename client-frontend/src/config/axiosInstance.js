// src/config/axiosinstance.js

import axios from 'axios';

// Read the base URL from Vite environment variables
// Make sure you have VITE_API_BASE_URL defined in your .env file
const baseURL = import.meta.env.VITE_API_BASE_URL;
console.log('API base URL is:', baseURL);

// Create and export the axios instance
export const api = axios.create({
  baseURL: `${baseURL}/api`,  // e.g. http://localhost:3001/api
  withCredentials: true,      // include cookies if your backend uses them
});
