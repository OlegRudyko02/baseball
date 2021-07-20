import type { RootState } from '../../../../baseball/src/store/store';
import { createSelector } from 'reselect';

const get = (state: RootState) => state.auth.access_token

export const getToken = createSelector(get, (token) => token)



