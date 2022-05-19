import { RootState } from "reducers";
import { createSelector } from "@rbxts/roselect";

export const selectNodeIds = (state: RootState) => state.hierarchy.nodeIds;
export const selectNodesById = (state: RootState) => state.hierarchy.nodesById;
export const selectNode = (state: RootState, id: number) => state.hierarchy.nodesById[id]!;

export const selectNodeOrder = createSelector([selectNode, selectNodeIds], (node, nodeIds) => nodeIds.indexOf(node.id));

export const selectNodeDepth = createSelector([selectNode, selectNodesById], (node, nodesById) => {
	if (node === undefined) {
		return 0;
	}

	let depth = 0;
	let currentId = node.memberOf;
	while (currentId !== undefined) {
		depth++;
		currentId = nodesById[currentId]?.memberOf;
	}

	return depth;
});

export const selectNodeAncestorExpanded = createSelector([selectNode, selectNodesById], (node, nodesById) => {
	if (node === undefined) {
		return true;
	}

	let currentId = node.memberOf;
	while (currentId !== undefined) {
		if (!nodesById[currentId]?.expanded) {
			return false;
		}
		currentId = nodesById[currentId]?.memberOf;
	}

	return true;
});

export const selectNodeChildrenIds = createSelector(
	[selectNode, selectNodesById, selectNodeIds],
	(parent, nodesById, nodeIds) => nodeIds.filter((id) => nodesById[id]?.memberOf === parent.id),
);

export const selectNodeChildren = createSelector([selectNodeChildrenIds, selectNodesById], (children, nodesById) =>
	children.mapFiltered((id) => nodesById[id]),
);

export const selectNodeSize = createSelector([selectNodeChildrenIds], (children) => children.size());
