import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchInstructorSentiment = createAsyncThunk(
  "instructor/fetchSentiment",  
  async (instructorId) => {
 
    const response = await axios.get(`http://localhost:5000/api/instructors/${instructorId}`);
    return response.data; 
  }
);
