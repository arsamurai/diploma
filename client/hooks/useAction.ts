import { bindActionCreators } from "redux";
import { allActionCreators } from "../store/reducers/all-actions-creators";
import { useTypedDispatch } from "./useTypedDispatch";

export const useActions = () => {
	const dispatch = useTypedDispatch();
	return bindActionCreators(allActionCreators, dispatch);
}