import { HierarchyNode } from "./model";

export function appendNode(node: HierarchyNode) {
	return { type: "APPEND_NODE", node } as const;
}

export function expandNode(id: number, children: readonly HierarchyNode[]) {
	return { type: "EXPAND_NODE", id, children } as const;
}

export function collapseNode(id: number) {
	return { type: "COLLAPSE_NODE", id } as const;
}

export function collapseNodeDeep(id: number) {
	return { type: "COLLAPSE_NODE_DEEP", id } as const;
}

export type HierarchyAction =
	| ReturnType<typeof appendNode>
	| ReturnType<typeof expandNode>
	| ReturnType<typeof collapseNode>
	| ReturnType<typeof collapseNodeDeep>;
