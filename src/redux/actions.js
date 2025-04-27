import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const fetchInstructorSentiment = createAsyncThunk(
  "instructor/fetchSentiment",  
  async (instructorId) => {
    const response = await axios.get(`${API_URL}/api/instructors/${instructorId}`);
    return response.data; 
  }
);
