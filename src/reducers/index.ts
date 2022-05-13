import Rodux from "@rbxts/rodux";
import hierarchyReducer, { HierarchyState } from "./hierarchy";

export interface RootState {
	hierarchy: HierarchyState;
}

export default Rodux.combineReducers<RootState, Rodux.AnyAction>({
	hierarchy: hierarchyReducer,
});
