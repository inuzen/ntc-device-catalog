import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface AuthState {
    allowEditing: boolean;
    editMode: 'none' | 'mod' | 'edit' | 'new';
    showViewModal: boolean;
}

const initialState: AuthState = {
    allowEditing: false,
    editMode: 'none',
    showViewModal: false,
};

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        enableEditing: (state) => {
            state.allowEditing = true;
        },
        disableEditing: (state) => {
            state.allowEditing = false;
        },
        setEditMode: (state, action) => {
            state.editMode = action.payload;
        },
        openViewModal: (state) => {
            state.showViewModal = true;
        },
        closeViewModal: (state) => {
            state.showViewModal = false;
        },
    },
});

export const { enableEditing, disableEditing, setEditMode, openViewModal, closeViewModal } = layoutSlice.actions;

export const isEditingAllowed = (state: RootState) => state.layout.allowEditing;
export const getEditMode = (state: RootState) => state.layout.editMode;
export const shouldShowViewModal = (state: RootState) => state.layout.showViewModal;

export default layoutSlice.reducer;
