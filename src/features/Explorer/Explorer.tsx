import Roact from "@rbxts/roact";
import { arrayToMap } from "@rbxts/roact-hooked-plus";
import { pure, useEffect } from "@rbxts/roact-hooked";

import ExplorerNode from "./ExplorerNode";
import Object from "@rbxts/object-utils";
import Root from "components/Root";
import { appendNode, createNode, selectNodeIds, selectNodesById } from "reducers/hierarchy";
import { useRootDispatch, useRootSelector } from "hooks/use-root-store";

function Explorer() {
	const dispatch = useRootDispatch();
	const nodeIds = useRootSelector(selectNodeIds);
	const nodesById = useRootSelector(selectNodesById);

	useEffect(() => {
		dispatch(appendNode(createNode(game.GetService("Workspace"))));
		dispatch(appendNode(createNode(game.GetService("Workspace"))));
		dispatch(appendNode(createNode(game.GetService("PluginGuiService"))));
	}, []);

	return (
		<Root>
			<scrollingframe
				CanvasSize={new UDim2(0, 0, 0, (nodeIds.size() + 1) * 50)}
				Size={new UDim2(0, 500, 0, 500)}
				Position={new UDim2(0.15, 0, 0.3, 0)}
			>
				{arrayToMap(Object.values(nodesById), (node) => [
					node.id,
					<ExplorerNode node={node} order={nodeIds.indexOf(node.id)} />,
				])}
			</scrollingframe>
		</Root>
	);
}

export default pure(Explorer);
