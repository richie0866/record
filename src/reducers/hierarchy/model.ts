export interface HierarchyNode {
	id: number;
	value: defined;
	memberOf?: number;
}

export interface HierarchyState {
	nodesById: Record<number, HierarchyNode | undefined>;
	nodeIds: number[];
}
