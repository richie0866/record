import { TreeAction } from "./actions";
import { TreeState } from "./model";
import { sortNodes } from "./utils";

const initialState: TreeState = {
	nodes: {},
};

export default function treeReducer(state = initialState, action: TreeAction) {
	switch (action.type) {
		case "PUSH_NODE": {
			const { node } = action;

			const nodes = table.clone(state.nodes);
			nodes[node.id] = node;

			if (node.parent !== undefined && nodes[node.parent]) {
				const parent = table.clone(nodes[node.parent]!);
				const children = [...(parent.children || []), node.id];
				parent.children = sortNodes(children, nodes);
			}

			return { nodes };
		}
		case "POPULATE_NODE": {
			const { id, children } = action;

			const node = table.clone(state.nodes[id]!);
			const nodes = table.clone(state.nodes);
			nodes[id] = node;

			for (const child of children) {
				const childCopy = table.clone(child);
				childCopy.parent = id;
				if (!nodes[childCopy.id]) {
					nodes[childCopy.id] = childCopy;
				}
			}

			// Remove any children that are no longer in the tree.
			const nodeChildren = node.children || [];
			for (const child of nodeChildren) {
				if (!children.find((c) => c.id === child)) {
					nodes[child] = undefined;
				}
			}

			node.children = sortNodes(
				children.map((child) => child.id),
				nodes,
			);

			return { nodes };
		}
		case "DELETE_NODE": {
			const { id } = action;

			const nodes = table.clone(state.nodes);
			const node = nodes[id]!;

			if (node.parent !== undefined) {
				const parent = table.clone(nodes[node.parent]!);
				parent.children = parent.children!.filter((child) => child !== id);
			}

			nodes[id] = undefined;

			return { nodes };
		}
		case "EXPAND_NODE": {
			const { id } = action;

			const node = table.clone(state.nodes[id]!);
			node.expanded = true;

			const nodes = table.clone(state.nodes);
			nodes[id] = node;

			return { nodes };
		}
		case "COLLAPSE_NODE": {
			const { id } = action;

			const node = table.clone(state.nodes[id]!);
			node.expanded = false;

			const nodes = table.clone(state.nodes);
			nodes[id] = node;

			return { nodes };
		}
		case "DEEP_COLLAPSE_NODE": {
			const { id } = action;

			const node = table.clone(state.nodes[id]!);
			node.expanded = false;
			node.children = [];

			const nodes = table.clone(state.nodes);
			nodes[id] = node;

			for (const [, someNode] of pairs(nodes)) {
				let current = someNode.parent;
				while (current !== undefined) {
					if (current === id) {
						nodes[someNode.id] = undefined;
						break;
					}
					current = state.nodes[current]?.parent;
				}
			}

			return { nodes };
		}
		default:
			return state;
	}
}
