import Rodux from "@rbxts/rodux";
import counterReducer, { CounterState } from "./counter.reducer";

export interface RootState {
	counter: CounterState;
}

export default Rodux.combineReducers<RootState, Rodux.AnyAction>({
	counter: counterReducer,
});
