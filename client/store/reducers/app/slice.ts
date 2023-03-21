import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';
import { IAppState } from "./types";
import { ISearchResultsList } from "./types";

const initialState: IAppState = {
	searchResults: null,
  isLoading: true,
	isError: ''
};

export const appReducer = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSearchResults(state, action: PayloadAction<ISearchResultsList>) {
      state.searchResults = action.payload
    },
    setIsLoading(state) {
      state.isLoading = true
    },
    setIsReady(state) {
      state.isLoading = false
    },
    setIsError(state, action: PayloadAction<string>) {
      state.isError = action.payload
    },
  },
	extraReducers: {
		[HYDRATE]: (state, action) => {
			return {
				...state,
				...action.payload.isloading,
			};
		},
	},
});

export const { setSearchResults, setIsLoading, setIsReady, setIsError } = appReducer.actions;
export default appReducer.reducer;
