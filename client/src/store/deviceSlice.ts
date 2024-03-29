import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';

import { axiosAPI } from '../api/api';

export type Device = {
    id?: number;
    name: string;
    shortName?: string;
    description?: string;
    additionalInfo?: string;
    organization?: 'ntc' | 'st';
    isModification: boolean;
    imagePath?: string;
    originalDevice?: Device;
    originalDeviceId?: number;
    modifications?: Device[];
};
export interface DeviceState {
    deviceList: Device[];
    searchResults: Device[];
    totalDeviceCount: number;
    currentDevice: Device | null;
    currentDeviceId: number | null;
}

const initialState: DeviceState = {
    deviceList: [],
    searchResults: [],
    totalDeviceCount: 0,
    currentDevice: null,
    currentDeviceId: null,
};

export const addDevice = createAsyncThunk('devices/addDevice', async (device: FormData) => {
    const res = await axiosAPI.post('devices', device, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
});

export const getAllDevices = createAsyncThunk(
    'devices/getDevices',
    async (pageSettings: { offset: number; limit: number }) => {
        // const response = await axiosAPI.get(`devices/${JSON.stringify(pageSettings)}`);
        const response = await axiosAPI.get(`devices/`);

        return response.data;
    },
);
export const searchDevices = createAsyncThunk(
    'devices/searchDevices',
    async (searchQuery: { searchString: string; isNTC: boolean; isST: boolean; includeMods: boolean }) => {
        const response = await axiosAPI.post(`devices/search/`, searchQuery);
        console.log(response.data);

        return response.data;
    },
);

// export const getDevicesPaginated = createAsyncThunk('devices/getDevices', async () => {
//     const response = await axiosAPI.get('devices');
//     return response.data;
// });

export const getSingleDevice = createAsyncThunk('devices/getSingleDevice', async (id: number) => {
    const response = await axiosAPI.get(`devices/${id}`);
    return response.data;
});

export const deleteDevice = createAsyncThunk('devices/deleteDevice', async (id: number) => {
    await axiosAPI.delete(`devices/${id}`);
    return id;
});

export const updateDevice = createAsyncThunk('devices/updateDevice', async ({ device, id }: any) => {
    const res = await axiosAPI.put(`devices/${id}`, device, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
});

export const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        setCurrentDeviceFromState: (state, action) => {
            state.currentDevice = action.payload
                ? state.deviceList.find((device) => device.id === action.payload)
                : null;
        },
        clearSearchResults: (state) => {
            state.searchResults = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addDevice.fulfilled, (state, action) => {
                state.deviceList.push(action.payload.device);
            })
            .addCase(getAllDevices.fulfilled, (state, action) => {
                state.deviceList = action.payload.rows || [];
                state.totalDeviceCount = action.payload.rows.length || 0;
            })
            .addCase(searchDevices.fulfilled, (state, action) => {
                state.searchResults = action.payload.rows || [];
                state.totalDeviceCount = action.payload.rows.length || 0;
            })
            .addCase(getSingleDevice.fulfilled, (state, action) => {
                state.currentDevice = action.payload;
            })
            .addCase(deleteDevice.fulfilled, (state, action) => {
                state.deviceList = state.deviceList.filter((device) => device.id !== action.payload);
            })
            .addCase(updateDevice.fulfilled, (state, action) => {
                state.deviceList = state.deviceList.map((device) => {
                    if (device.id === action.payload.id) {
                        return action.payload;
                    }
                    return device;
                });
                if (state.currentDevice.id === action.payload.id) {
                    state.currentDevice = action.payload;
                }
            });
    },
});

export const { setCurrentDeviceFromState, clearSearchResults } = deviceSlice.actions;

export const getDeviceList = (state: RootState) => state.devices.deviceList;
export const getSearchResults = (state: RootState) => state.devices.searchResults;
export const getCurrentDevice = (state: RootState): Device | null => state.devices.currentDevice;
export const getTotalDeviceCount = (state: RootState): number => state.devices.totalDeviceCount;

export const selectDeviceById = (state: RootState, deviceId: number) =>
    state.devices.deviceList.find((device) => device.id === deviceId);

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
