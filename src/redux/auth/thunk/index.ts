import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../types';

export const verifyAuth = createAsyncThunk(
  'auth/verifyAuth',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get<{ user: User }>('/api/auth/me');
      console.log('rejectWithValue',res)
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
