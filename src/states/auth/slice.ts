import { createSlice } from '@reduxjs/toolkit';
import { authStore } from './types';

const initialState: authStore = {
  access_token: null,
  client: null,
  uid: null
}

const auth = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    signIn: (state, {payload}) => {
      console.log(payload)
      state.access_token = payload['access-token']
      state.client = payload.client
      state.uid = payload.uid
    },
    signOut: (state) => {
      state.access_token = null
      state.client = null
      state.uid = null
    }
  }
});

export const actions = {
  ...auth.actions,
};

export const { reducer } = auth;
