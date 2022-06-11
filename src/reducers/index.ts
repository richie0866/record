import Rodux from "@rbxts/rodux";
import treeReducer, { TreeState } from "./tree";

export interface RootState {
	tree: TreeState;
}

export default Rodux.combineReducers<RootState, Rodux.AnyAction>({
	tree: treeReducer,
});
