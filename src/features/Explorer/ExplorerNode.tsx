import Roact from "@rbxts/roact";
import { hooked, useEffect, useState } from "@rbxts/roact-hooked";

import { collapseNode, expandNode, getNodeChildren, selectNode, selectNodeDepth } from "reducers/hierarchy";
import { useRootDispatch, useRootSelector } from "hooks/use-root-store";

interface Props {
	id: number;
	order: number;
}

function ExplorerNode({ id, order }: Props) {
	const dispatch = useRootDispatch();

	const node = useRootSelector((state) => selectNode(state, id));
	const depth = useRootSelector((state) => selectNodeDepth(state, node.id));

	const [isExpanded, setIsExpanded] = useState(false);

	useEffect(() => {
		if (isExpanded) {
			dispatch(expandNode(id, order, getNodeChildren(node)));
		} else {
			dispatch(collapseNode(id, order));
		}
	}, [isExpanded]);

	return (
		<frame
			Size={new UDim2(0, 480 - depth * 30, 0, 50)}
			Position={new UDim2(0, depth * 30, 0, order * 50)}
			ZIndex={order}
		>
			<textbutton
				Event={{
					Activated: () => setIsExpanded((isExpanded) => !isExpanded),
				}}
				Text={isExpanded ? "v" : ">"}
				TextSize={20}
				Size={new UDim2(0, 20, 1, 0)}
			/>
			<textlabel
				Text={tostring(node.value)}
				TextSize={20}
				TextXAlignment="Left"
				Size={new UDim2(1, -30, 1, 0)}
				Position={new UDim2(0, 30, 0, 0)}
			/>
		</frame>
	);
}

export default hooked(ExplorerNode);
