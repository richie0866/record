import { Node } from "./model";

export function pushNode(node: Node) {
	return { type: "PUSH_NODE", node } as const;
}

export function populateNode(id: number, children: Node[]) {
	return { type: "POPULATE_NODE", id, children } as const;
}

export function deleteNode(id: number) {
	return { type: "DELETE_NODE", id } as const;
}

export function expandNode(id: number) {
	return { type: "EXPAND_NODE", id } as const;
}

export function collapseNode(id: number) {
	return { type: "COLLAPSE_NODE", id } as const;
}

export function deepCollapseNode(id: number) {
	return { type: "DEEP_COLLAPSE_NODE", id } as const;
}

export type TreeAction =
	| ReturnType<typeof pushNode>
	| ReturnType<typeof populateNode>
	| ReturnType<typeof deleteNode>
	| ReturnType<typeof expandNode>
	| ReturnType<typeof collapseNode>
	| ReturnType<typeof deepCollapseNode>;
