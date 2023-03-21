import { IBrand } from "../../../models/IBrand"

export interface ISort {
	name: string,
	value: string,
	order: string,
}

export interface IFiltersState {
	brands: IBrand[],
	byBrand: IBrand,
  sortBy: ISort,
	offset: number
}