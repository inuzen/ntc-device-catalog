import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import deviceReducer from './deviceSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        devices: deviceReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
