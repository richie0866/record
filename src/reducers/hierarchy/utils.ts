import { HierarchyNode } from "reducers/hierarchy";

let id = 0;

export function createNode(value: defined, parent?: number): HierarchyNode {
	return {
		id: ++id,
		value,
		memberOf: parent,
		expanded: false,
	};
}

export function getNodeChildrenValues(node: HierarchyNode): readonly defined[] {
	if (typeIs(node.value, "Instance")) {
		return node.value.GetChildren();
	}
	return [];
}

export function getNodeChildren(node: HierarchyNode): readonly HierarchyNode[] {
	return getNodeChildrenValues(node).map((child) => createNode(child, node.id));
}

export function countNodeChildren(node: HierarchyNode): number {
	if (typeIs(node.value, "Instance")) {
		return node.value.GetChildren().size();
	}
	return 0;
}

export function compareNode(a: HierarchyNode, b: HierarchyNode): boolean {
	return tostring(a.value).lower() > tostring(b.value).lower();
}
