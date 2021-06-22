import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';

import { axiosAPI } from '../api/api';

export type Device = {
    name: string;
    shortName?: string;
    description?: string;
    dimensions?: string;
    weight?: string;
    voltage?: string;
    supply?: string;
    additionalInfo?: string;
    amountInSupply?: number;
    organization?: 'ntc' | 'st';
    comments?: string;
    isModification: boolean;
    imagePath?: string;
    originalDeviceId?: string;
    modifications?: string[];
};
export interface DeviceState {
    deviceList: Device[];
    currentDeviceId: number | null;
}

const initialState: DeviceState = {
    deviceList: [],
    currentDeviceId: null,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const addDevice = createAsyncThunk('addDevice', async (device: FormData) => {
    const res = await axiosAPI.post('devices', device, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    console.log(res);

    return res;
});

export const getAllDevices = createAsyncThunk('getAllDevices', async () => {
    const response = await axiosAPI.get('devices');
    console.log(response.data);

    return response.data;
});

export const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addDevice.fulfilled, (state, action) => {})
            .addCase(getAllDevices.fulfilled, (state, action) => {
                console.log(action);
                state.deviceList = action.payload;
            });
    },
});

// export const { enableEditing, disableEditing } = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getDeviceList = (state: RootState) => state.devices.deviceList;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

// export const incrementIfOdd =
//     (amount: number): AppThunk =>
//     (dispatch, getState) => {
//         const currentValue = selectCount(getState());
//         if (currentValue % 2 === 1) {
//             dispatch(incrementByAmount(amount));
//         }
//     };

export default deviceSlice.reducer;
