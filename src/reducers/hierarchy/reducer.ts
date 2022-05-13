import { HierarchyAction } from "./action";
import { HierarchyState } from "./model";
import { getNodeDepth } from "./utils";

const initialState: HierarchyState = {
	nodesById: {},
	nodeIds: [],
};

export default function hierarchyReducer(state = initialState, action: HierarchyAction): HierarchyState {
	switch (action.type) {
		case "APPEND_NODE": {
			const nodesById = table.clone(state.nodesById);
			const nodeIds = table.clone(state.nodeIds);

			nodesById[action.node.id] = action.node;
			nodeIds.push(action.node.id);

			return {
				nodesById,
				nodeIds,
			};
		}
		case "EXPAND_NODE": {
			const nodesById = table.clone(state.nodesById);
			const nodeIds = table.clone(state.nodeIds);

			for (const child of action.children) {
				nodesById[child.id] = child;
				nodeIds.insert(action.at + 1, child.id);
			}

			return {
				nodesById: nodesById,
				nodeIds,
			};
		}
		case "COLLAPSE_NODE": {
			const nodesById = table.clone(state.nodesById);
			const parentDepth = getNodeDepth(nodesById[action.id]!, nodesById);

			let ignoreRest = false;

			const nodeIds = state.nodeIds.filter((id, index) => {
				if (ignoreRest || index < action.at + 1) {
					return true;
				}

				const node = nodesById[id];

				if (node?.memberOf === action.id) {
					// nodesById[id] = undefined;
					return false;
				}

				if (node && getNodeDepth(node, nodesById) <= parentDepth) {
					ignoreRest = true;
				}

				return true;
			});

			return {
				nodesById,
				nodeIds,
			};
		}
		case "COLLAPSE_NODE_DEEP": {
			const nodesById = table.clone(state.nodesById);
			const nodeIds = state.nodeIds.filter((id) => {
				let currentId: number | undefined = state.nodesById[id]?.memberOf;

				while (currentId !== undefined) {
					if (currentId === action.id) {
						nodesById[id] = undefined;
						return false;
					}
					currentId = state.nodesById[currentId]?.memberOf;
				}

				return true;
			});

			return {
				nodesById,
				nodeIds,
			};
		}
		default:
			return state;
	}
}
