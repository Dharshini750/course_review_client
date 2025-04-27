import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/Slices/authSlice';
import userReducer from '../redux/Slices/userSlice'
import instructorReducer from './Slices/InstructorSlice'; 
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    instructor: instructorReducer,
  },
});

export default store;
