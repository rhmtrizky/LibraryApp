import { createSlice } from '@reduxjs/toolkit';
import { setAuthToken } from '../../lib/Api';
import { IMember } from '../../features/interfaces/Auth/Auth';

const initialAuthState: IMember = {
  id: 0,
  name: '',
  email: '',
  password: '',
  penalty: false,
  penaltyEndDate: '',
  borrows: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    AUTH_LOGIN: (_, action) => {
      const payload = action.payload;
      setAuthToken(payload.token);
      localStorage.setItem('token', payload.token);

      if (payload.member) {
        const member: IMember = {
          id: payload.member.id,
          code: payload.member.code,
          email: payload.member.email,
          penalty: payload.member.penalty,
          penaltyEndDate: payload.member.penaltyEndDate,
          borrows: payload.borrows,
        };

        return member;
      } else {
        return initialAuthState;
      }
    },

    AUTH_CHECK: (_, action) => {
      const payload = action.payload;

      const member: IMember = {
        id: payload.id,
        code: payload.code,
        email: payload.email,
        penalty: payload.penalty,
        penaltyEndDate: payload.penaltyEndDate,
        borrows: payload.borrows,
      };

      return member;
    },

    AUTH_ERROR: () => {
      localStorage.removeItem('token');
    },

    AUTH_LOGOUT: () => {
      localStorage.removeItem('token');
    },
  },
});
