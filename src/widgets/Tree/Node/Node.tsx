import NodeView from "./NodeView";
import Roact from "@rbxts/roact";
import { Node, connectNode, createNode, getNodeChildren, populateNode } from "reducers/tree";
import { pure, useEffect, useState } from "@rbxts/roact-hooked";
import { useNode, useNodeVisible } from "./use-node";
import { useRootDispatch } from "hooks/use-root-store";

interface Props {
	id: number;
}

function Node({ id }: Props) {
	const dispatch = useRootDispatch();

	const node = useNode(id);
	const visible = useNodeVisible(id);

	const [children, setChildren] = useState<Node[]>(() => getNodeChildren(node).map((value) => createNode(value, id)));

	useEffect(() => {
		const disconnect = connectNode(node, {
			onNodeAdded: (value) => {
				const child = createNode(value);
				setChildren((prev) => [...prev, child]);
			},
			onNodeRemoved: (value) => {
				setChildren((prev) => prev.filter((n) => n.value !== value));
			},
		});

		return () => {
			disconnect();
		};
	}, []);

	useEffect(() => {
		if (node.expanded && visible) {
			dispatch(populateNode(id, children));
		}
	}, [children, node.expanded, visible]);

	return <>{visible && <NodeView node={node} size={children.size()} />}</>;
}

export default pure(Node);
