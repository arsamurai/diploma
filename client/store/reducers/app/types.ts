import { IDevice } from './../../../models/IDevice';
import { IType } from "../../../models/IType";

export interface IAppState {
	searchResults: ISearchResultsList | null;
	isLoading: boolean,
	isError: string
}

export interface ISearchResult {
	id: number;
	name: string;
}

export interface ISearchResultsList {
	devices?: IDevice[];
	types?: IType[];
}