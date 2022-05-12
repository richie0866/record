import Roact from "@rbxts/roact";
import { Provider } from "@rbxts/roact-rodux-hooked";

import App from "components/App";
import { IS_LOADED } from "constants/app";
import { configureStore } from "configure-store";
import { getMountTarget } from "utils/get-mount-target";
import { hasGlobal, setGlobal } from "utils/global-util";

if (hasGlobal(IS_LOADED)) {
	throw `The global ${IS_LOADED} is already defined.`;
}

Roact.mount(
	<Provider store={configureStore()}>
		<App />
	</Provider>,
	getMountTarget(),
);

setGlobal(IS_LOADED, true);
