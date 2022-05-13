import Rodux from "@rbxts/rodux";
import rootReducer from "reducers";

export function configureStore() {
	return new Rodux.Store(rootReducer, undefined, [Rodux.loggerMiddleware]);
}
