import { RootState } from "reducers";
import { createSelector } from "@rbxts/roselect";
import { getNodeDepth } from "./utils";

export const selectNodeIds = (state: RootState) => state.hierarchy.nodeIds;
export const selectNodesById = (state: RootState) => state.hierarchy.nodesById;
export const selectNode = (state: RootState, id: number) => state.hierarchy.nodesById[id]!;

export const selectNodeOrder = createSelector([selectNode, selectNodeIds], (node, nodeIds) => nodeIds.indexOf(node.id));

export const selectNodeDepth = createSelector([selectNode, selectNodesById], getNodeDepth);

export const selectNodeChildren = createSelector(
	[selectNode, selectNodesById, selectNodeIds],
	(parent, nodesById, nodeIds) => nodeIds.filter((id) => nodesById[id]?.memberOf === parent.id),
);

export const selectNodeSize = createSelector([selectNodeChildren], (children) => children.size());
