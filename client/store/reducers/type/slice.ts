import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';
import { IType } from "../../../models/IType";
import { ITypeState } from "./types";

const initialState: ITypeState = {
  types: [] as IType[]
};

export const typesReducer = createSlice({
  name: "types",
  initialState,
  reducers: {
    setTypes(state, action: PayloadAction<IType[]>) {
      state.types = action.payload;
    },
  },
	extraReducers: {
		[HYDRATE]: (state, action) => {
			return {
				...state,
				...action.payload.types,
			};
		},
	},
});

export const { setTypes } = typesReducer.actions;
export default typesReducer.reducer;
