import type { RootState } from '../../../../baseball/src/store/store';
import { createSelector } from 'reselect';

const get = (state: RootState) => state.auth

export const auth = createSelector(get, (auth) => auth)



