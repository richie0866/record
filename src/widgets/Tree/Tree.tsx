import Node, { NODE_HEIGHT } from "./Node";
import Roact from "@rbxts/roact";
import { createNode, pushNode, selectNodeMap, selectNodesVisible } from "reducers/tree";
import { pure, useEffect } from "@rbxts/roact-hooked";
import { useRootDispatch, useRootSelector } from "hooks/use-root-store";

function Tree() {
	const dispatch = useRootDispatch();
	const nodes = useRootSelector(selectNodeMap);
	const nodesVisible = useRootSelector(selectNodesVisible);

	useEffect(() => {
		dispatch(pushNode(createNode(game.GetService("Workspace"))));
		dispatch(pushNode(createNode(game.GetService("Workspace"))));
		dispatch(pushNode(createNode(game.GetService("Stats"))));
	}, []);

	const elements = new Map<number, Roact.Element>();
	for (const [id] of nodes) {
		elements.set(id, <Node id={id} />);
	}

	return (
		<scrollingframe CanvasSize={new UDim2(0, 0, 0, (nodesVisible + 1) * NODE_HEIGHT)} Size={new UDim2(1, 0, 1, 0)}>
			{elements}
		</scrollingframe>
	);
}

export default pure(Tree);
