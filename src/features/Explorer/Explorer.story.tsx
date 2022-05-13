import Roact from "@rbxts/roact";
import { Provider } from "@rbxts/roact-rodux-hooked";

import Explorer from "./Explorer";
import { configureStore } from "configure-store";

export = (target: Frame) => {
	const handle = Roact.mount(
		<Provider store={configureStore()}>
			<Explorer />
		</Provider>,
		target,
		"Explorer",
	);

	return () => {
		Roact.unmount(handle);
	};
};
