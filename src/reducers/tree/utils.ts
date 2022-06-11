import { Node } from "./model";

let nextId = 0;

export function createNode(value: defined, parent?: number): Node {
	return {
		id: nextId++,
		value,
		parent,
		expanded: false,
	};
}

export function getNodeChildren(parent: Node): defined[] {
	if (typeIs(parent.value, "Instance")) {
		return parent.value.GetChildren();
	}
	return [];
}

export function createNodesForChildren(parent: Node): Node[] {
	if (typeIs(parent.value, "Instance")) {
		return parent.value.GetChildren().map((child) => createNode(child, parent.id));
	}
	return [];
}

export function connectNode(
	node: Node,
	hooks: {
		onNodeAdded: (value: defined) => void;
		onNodeRemoved: (value: defined) => void;
	},
): () => void {
	if (typeIs(node.value, "Instance")) {
		const added = node.value.ChildAdded.Connect((child) => {
			hooks.onNodeAdded(child);
		});

		const removed = node.value.ChildRemoved.Connect((child) => {
			hooks.onNodeRemoved(child);
		});

		return () => {
			added.Disconnect();
			removed.Disconnect();
		};
	}

	return () => {};
}

export function sortNodes(ids: number[], nodes: Record<number, Node | undefined>): number[] {
	const copy = table.clone(ids);
	copy.sort((a, b) => {
		const aNode = nodes[a]!;
		const bNode = nodes[b]!;
		return tostring(aNode.value) < tostring(bNode.value);
	});
	return copy;
}
