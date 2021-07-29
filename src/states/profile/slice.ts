import { createSlice } from '@reduxjs/toolkit';
import { profileStore } from './types';

const initialState: profileStore = {
  profile : {
    age: 0,
    avatar: '',
    bats_hand: '',
    biography: '',
    facilities: [],
    feet: 0,
    first_name: '',
    id: '',
    inches: 0,
    last_name: '',
    position: '',
    position2: '',
    school: {id: '', name: ''},
    school_year: '',
    teams: [{id: '', name: ''}],
    throws_hand: '',
    weight: 0
  }
}

const profile = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    update: (state, {payload}) => {
      state.profile = {...payload}
    },
    updateFavorite: (state, {payload}) => {
      state.profile.favorite = payload.favorite
    },
  }
});

export const actions = {
  ...profile.actions,
};

export const { reducer } = profile;
