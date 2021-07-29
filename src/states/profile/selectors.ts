import type { RootState } from '../../store/store';
import { createSelector } from 'reselect';

const get = (state: RootState) => state.profile.profile

export const profile = createSelector(get, (profile) => profile)



