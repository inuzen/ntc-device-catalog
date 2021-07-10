import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import layoutReducer from './layoutSlice';
import deviceReducer from './deviceSlice';

export const store = configureStore({
    reducer: {
        layout: layoutReducer,
        devices: deviceReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export type LoadingState = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};
