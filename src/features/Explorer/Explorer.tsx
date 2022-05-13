import Roact from "@rbxts/roact";
import { pure, useEffect } from "@rbxts/roact-hooked";

import ExplorerNode from "./ExplorerNode";
import Root from "components/Root";
import { appendNode, createNode, selectNodeIds } from "reducers/hierarchy";
import { arrayToMap } from "@rbxts/roact-hooked-plus";
import { useRootDispatch, useRootSelector } from "hooks/use-root-store";

function Explorer() {
	const dispatch = useRootDispatch();
	const nodeIds = useRootSelector(selectNodeIds);

	useEffect(() => {
		dispatch(appendNode(createNode(game.GetService("Workspace"))));
		dispatch(appendNode(createNode(game.GetService("Workspace"))));
	}, []);

	const duplicates: Record<number, number | undefined> = {};

	return (
		<Root>
			<scrollingframe
				CanvasSize={new UDim2(0, 0, 0, (nodeIds.size() + 1) * 50)}
				Size={new UDim2(0, 500, 0, 500)}
				Position={new UDim2(0.15, 0, 0.3, 0)}
			>
				{arrayToMap(nodeIds, (id, order) => [
					`${id}-${id in duplicates ? ++duplicates[id]! : (duplicates[id] = 0)}`,
					<ExplorerNode id={id} order={order} />,
				])}
			</scrollingframe>
		</Root>
	);
}

export default pure(Explorer);
