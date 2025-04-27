import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserDetails = createAsyncThunk("user/fetchUserDetails", async (email) => {
  const response = await axios.get(`${API_URL}/api/users/${email}`);
  return response.data;
});
export const updateUserDetails = createAsyncThunk("user/updateUserDetails", async (userDetails) => {
  const response = await axios.put(`${API_URL}/api/users/${userDetails.email}`, userDetails);
  return response.data;
});
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    userDetails: {
      phone: "",
      age: "",
      gender: "",
      education: "",
      college: "",
      skills: [],
      preferences: [],
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.userDetails = action.payload;
      });
  },
});

export default userSlice.reducer;