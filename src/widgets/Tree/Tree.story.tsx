import Container from "components/Container";
import Roact from "@rbxts/roact";
import Root from "components/Root";
import Tree from "./Tree";
import { Provider } from "@rbxts/roact-rodux-hooked";
import { configureStore } from "configure-store";

export = (target: Frame) => {
	const handle = Roact.mount(
		<Provider store={configureStore()}>
			<Root>
				<Container size={new UDim2(0, 500, 0, 500)} position={new UDim2(0.15, 0, 0.3, 0)}>
					<Tree />
				</Container>
			</Root>
		</Provider>,
		target,
		"Explorer",
	);

	return () => {
		Roact.unmount(handle);
	};
};
