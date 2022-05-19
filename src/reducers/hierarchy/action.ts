import { HierarchyNode } from "./model";

export function appendNode(node: HierarchyNode) {
	return { type: "APPEND_NODE", node } as const;
}

export function insertNode(node: HierarchyNode, at: number) {
	return { type: "INSERT_NODE", node, at } as const;
}

export function deleteNode(id: number) {
	return { type: "DELETE_NODE", id } as const;
}

export function expandNode(id: number, children: readonly HierarchyNode[]) {
	return { type: "EXPAND_NODE", id, children } as const;
}

export function insertNodeChild(child: HierarchyNode, parent: number) {
	return { type: "INSERT_NODE_CHILD", child, parent } as const;
}

export function deleteNodeChild(id: number) {
	return { type: "DELETE_NODE_CHILD", id } as const;
}

export function collapseNode(id: number) {
	return { type: "COLLAPSE_NODE", id } as const;
}

export function collapseNodeDeep(id: number) {
	return { type: "COLLAPSE_NODE_DEEP", id } as const;
}

export type HierarchyAction =
	| ReturnType<typeof appendNode>
	| ReturnType<typeof insertNode>
	| ReturnType<typeof deleteNode>
	| ReturnType<typeof expandNode>
	| ReturnType<typeof insertNodeChild>
	| ReturnType<typeof deleteNodeChild>
	| ReturnType<typeof collapseNode>
	| ReturnType<typeof collapseNodeDeep>;
