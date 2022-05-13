import { HierarchyNode } from "reducers/hierarchy";

let id = 0;

export function getUniqueId() {
	id += 1;
	return id;
}

export function createNode(value: defined, parent?: number) {
	return {
		id: getUniqueId(),
		value,
		memberOf: parent,
	};
}

export function getNodeChildren(node: HierarchyNode): readonly HierarchyNode[] {
	let children: defined[] = [];

	if (typeIs(node.value, "Instance")) {
		children = node.value.GetChildren();
	}

	return children.map((child) => createNode(child, node.id));
}
