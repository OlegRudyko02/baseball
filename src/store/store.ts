import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'
import { authReducer } from '../states/auth';
import { profileReducer } from '../states/profile';
import storage from 'redux-persist/lib/storage'

const authConfig = {
  key: 'auth',
  storage: storage
}
const profileConfig = {
  key: 'profile',
  storage: storage
}
export const store = configureStore({
  reducer: {
    auth: persistReducer(authConfig, authReducer),
    profile: persistReducer(profileConfig, profileReducer)
  }
});
export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

