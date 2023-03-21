import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';
import { IDevice } from "../../../models/IDevice";
import { IDeviceState } from "./types";

const initialState: IDeviceState = {
  device: {} as IDevice,
	recsTypes: [] as IDevice[],
	recsBrands: [] as IDevice[],
	isLoading: true
};

export const deviceReducer = createSlice({
  name: "device",
  initialState,
  reducers: {
    setDevice(state, action: PayloadAction<IDevice>) {
      state.device = action.payload;
    },
    setRecsTypes(state, action: PayloadAction<IDevice[]>) {
      state.recsTypes = action.payload;
    },
    setRecsBrands(state, action: PayloadAction<IDevice[]>) {
      state.recsBrands = action.payload;
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
				...action.payload.device,
			};
		},
	},
});

export const { setDevice, setRecsTypes, setRecsBrands, setIsLoading, setIsReady } = deviceReducer.actions;
export default deviceReducer.reducer;
