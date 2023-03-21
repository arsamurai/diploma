import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';
import { IRole } from "../../../models/IRole";
import { IRoleState } from "./types";

const initialState: IRoleState = {
  roles: [] as IRole[]
};

export const rolesReducer = createSlice({
  name: "roles",
  initialState,
  reducers: {
    setRoles(state, action: PayloadAction<IRole[]>) {
      state.roles = action.payload;
    },
  },
	extraReducers: {
		[HYDRATE]: (state, action) => {
			return {
				...state,
				...action.payload.roles,
			};
		},
	},
});

export const { setRoles } = rolesReducer.actions;
export default rolesReducer.reducer;
