import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';
import { IDevice } from "../../../models/IDevice";
import { IDevicesState } from "./types";

const initialState: IDevicesState = {
	allDevices: [] as IDevice[],
  devices: [] as IDevice[],
  count: 0,
	isLoading: true
};  

export const devicesReducer = createSlice({
  name: "devices",
  initialState,
  reducers: {
    setAllDevices(state, action: PayloadAction<IDevice[]>) {
      state.allDevices = action.payload;
    },
    setDevices(state, action: PayloadAction<IDevice[]>) {
      state.devices = action.payload;
    },
    setCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
		setIsLoading(state) {
      state.isLoading = true
    },
    setIsReady(state) {
      state.isLoading = false
    },
  },
	extraReducers: {
		[HYDRATE]: (state, action) => {
			return {
				...state,
				...action.payload.devices,
			};
		},
	},
});

export const { setAllDevices, setDevices, setCount, setIsLoading, setIsReady } = devicesReducer.actions;
export default devicesReducer.reducer;
