export interface HierarchyNode {
	id: number;
	value: defined;
	expanded: boolean;
	memberOf?: number;
}

export interface HierarchyState {
	nodesById: Record<number, HierarchyNode | undefined>;
	nodeIds: number[];
}
