export interface Node {
	id: number;
	value: defined;
	parent?: number;
	children?: number[];
	expanded: boolean;
}

export interface TreeState {
	nodes: Record<number, Node | undefined>;
}
