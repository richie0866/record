import Container from "components/Container";
import Roact from "@rbxts/roact";
import Root from "components/Root";
import Tree from "widgets/Tree";

export default function App() {
	return (
		<Root>
			<Container size={new UDim2(0, 500, 0, 500)} position={new UDim2(0.15, 0, 0.3, 0)}>
				<Tree />
			</Container>
		</Root>
	);
}
