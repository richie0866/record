import { HierarchyNode } from "reducers/hierarchy";
import { HierarchyState } from "./model";

const instanceIds = new Map<Instance, number>();

let id = 0;

export function getUniqueId(value: unknown) {
	id += 1;

	if (typeIs(value, "Instance")) {
		if (!instanceIds.has(value)) {
			instanceIds.set(value, id);
		}

		return instanceIds.get(value)!;
	}

	return id;
}

export function createNode(value: defined, parent?: number) {
	return {
		id: getUniqueId(value),
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

export function getNodeDepth(node: HierarchyNode, nodesById: HierarchyState["nodesById"]) {
	let depth = 0;
	let currentId = node.memberOf;
	while (currentId !== undefined) {
		depth++;
		currentId = nodesById[currentId]?.memberOf;
	}
	return depth;
}

export function nodeIsDescendantOf(
	node: HierarchyNode,
	ancestor: HierarchyNode,
	nodesById: HierarchyState["nodesById"],
) {
	let currentId = node.memberOf;
	while (currentId !== undefined) {
		if (currentId === ancestor.id) {
			return true;
		}
		currentId = nodesById[currentId]?.memberOf;
	}
	return false;
}
