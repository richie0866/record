import { Node } from "./model";
import { RootState } from "reducers";
import { createSelector } from "@rbxts/roselect";

export const selectNodes = (state: RootState) => state.tree.nodes;
export const selectNodeMap = (state: RootState) => state.tree.nodes as unknown as Map<number, Node>;
export const selectNode = (state: RootState, id: number) => state.tree.nodes[id];
export const selectNodeChildrenIds = (state: RootState, id: number) => state.tree.nodes[id]?.children ?? [];
export const selectNodesVisible = createSelector([selectNodes], (nodes) => {
	let count = 0;

	const visit = (node: Node) => {
		count++;

		if (!node.expanded || !node.children) {
			return;
		}

		for (const child of node.children) {
			visit(nodes[child]!);
		}
	};

	// Visit the root nodes first, relying on pairs() to visit numeric indices
	// in order.
	for (const [, node] of pairs(nodes)) {
		if (node.parent === undefined) {
			visit(node);
		}
	}

	return count;
});

export const makeSelectNodeChildren = () => {
	const selectNodeChildren = createSelector([selectNodes, selectNodeChildrenIds], (nodes, children) => {
		return children.mapFiltered((id) => nodes[id]);
	});

	return selectNodeChildren;
};

export const makeSelectNodeSize = () => {
	const selectNodeSize = createSelector([selectNodeChildrenIds], (children) => {
		return children.size();
	});

	return selectNodeSize;
};

export const makeSelectNodeVisible = () => {
	const selectNodeVisible = createSelector([selectNodes, selectNode], (nodes, node) => {
		if (node === undefined) {
			return false;
		}

		let currentId: number | undefined = node.parent;

		while (currentId !== undefined) {
			const currentNode = nodes[currentId];
			if (!currentNode?.expanded) {
				return false;
			}
			currentId = currentNode?.parent;
		}

		return true;
	});

	return selectNodeVisible;
};

export const makeSelectNodeOrder = () => {
	const selectNodeOrder = createSelector([selectNodes, selectNode], (nodes, target) => {
		if (target === undefined) {
			return -1;
		}

		let order = 0;

		const visit = (node: Node) => {
			if (node.id === target.id) {
				return true;
			}

			order++;

			if (!node.expanded || !node.children) {
				return;
			}

			for (const child of node.children) {
				if (visit(nodes[child]!)) {
					return true;
				}
			}
		};

		// Visit the root nodes first, relying on pairs() to visit numeric indices
		// in order.
		for (const [, node] of pairs(nodes)) {
			if (node.parent === undefined && visit(node)) {
				break;
			}
		}

		return order;
	});

	return selectNodeOrder;
};

export const makeSelectNodeDepth = () => {
	const selectNodeDepth = createSelector([selectNodes, selectNode], (nodes, node) => {
		if (node === undefined) {
			return 0;
		}

		let depth = 0;
		let currentId = node.parent;

		while (currentId !== undefined) {
			depth++;
			currentId = nodes[currentId]!.parent;
		}

		return depth;
	});

	return selectNodeDepth;
};

export const makeSelectNodePosition = () => {
	const selectNodePosition = createSelector(
		[makeSelectNodeOrder(), makeSelectNodeDepth()],
		(order, depth): [order: number, depth: number] => [order, depth],
	);

	return selectNodePosition;
};
