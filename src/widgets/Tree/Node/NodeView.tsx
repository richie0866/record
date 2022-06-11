import NodeCaption from "./NodeCaption";
import NodeCaret from "./NodeCaret";
import Roact from "@rbxts/roact";
import { NODE_HEIGHT, NODE_INDENT } from "./constants";
import { Node } from "reducers/tree";
import { pure, useMemo } from "@rbxts/roact-hooked";
import { useNodePosition } from "./use-node";

interface Props {
	node: Node;
	size: number;
}

function NodeView({ node, size }: Props) {
	const expandedMemo = useMemo(() => node.expanded, []);
	const [order, depth] = useNodePosition(node.id);

	return (
		<frame
			Size={new UDim2(1, -depth * NODE_INDENT, 0, NODE_HEIGHT)}
			Position={new UDim2(0, depth * NODE_INDENT, 0, order * NODE_HEIGHT)}
			BorderSizePixel={0}
		>
			<NodeCaret id={node.id} size={size} defaultExpanded={expandedMemo} />
			<NodeCaption value={node.value} />
		</frame>
	);
}

export default pure(NodeView);
