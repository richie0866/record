import { HierarchyAction } from "./action";
import { HierarchyState } from "./model";
import { compareNode } from "./utils";
import { selectNodeChildren } from "./selectors";

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
		case "INSERT_NODE": {
			const nodesById = table.clone(state.nodesById);
			const nodeIds = table.clone(state.nodeIds);

			nodesById[action.node.id] = action.node;
			nodeIds.insert(action.at, action.node.id);

			return {
				nodesById,
				nodeIds,
			};
		}
		case "DELETE_NODE": {
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

			nodesById[action.id] = undefined;
			nodeIds.remove(nodeIds.indexOf(action.id));

			return {
				nodesById,
				nodeIds,
			};
		}
		case "EXPAND_NODE": {
			const nodesById = table.clone(state.nodesById);
			const nodeIds = table.clone(state.nodeIds);

			const children = table.clone(action.children);
			table.sort(children, compareNode);

			const startIndex = nodeIds.indexOf(action.id);
			for (const child of children) {
				if (!nodesById[child.id]) {
					nodesById[child.id] = child;
				}
				nodeIds.insert(startIndex + 1, child.id);
			}

			nodesById[action.id] = {
				...nodesById[action.id]!,
				expanded: true,
			};

			return {
				nodesById,
				nodeIds,
			};
		}
		case "INSERT_NODE_CHILD": {
			const nodesById = table.clone(state.nodesById);
			const nodeIds = table.clone(state.nodeIds);

			const currentChildren = selectNodeChildren({ hierarchy: state } as never, action.parent);
			const startIndex = nodeIds.indexOf(action.parent);
			let targetIndex = startIndex + 1;

			currentChildren.forEach((child, index) => {
				if (compareNode(child, action.child)) {
					targetIndex = startIndex + index + 1;
				}
			});

			nodesById[action.child.id] = action.child;
			nodeIds.insert(targetIndex, action.child.id);

			return {
				nodesById,
				nodeIds,
			};
		}
		case "DELETE_NODE_CHILD": {
			return {
				nodesById: state.nodesById,
				nodeIds: state.nodeIds.filter((id) => id !== action.id),
			};
		}
		case "COLLAPSE_NODE": {
			const nodesById = table.clone(state.nodesById);
			const nodeIds = state.nodeIds.filter((id) => {
				let currentId: number | undefined = state.nodesById[id]?.memberOf;

				while (currentId !== undefined) {
					if (currentId === action.id) {
						// nodesById[id] = undefined;
						return false;
					}
					currentId = state.nodesById[currentId]?.memberOf;
				}

				return true;
			});

			nodesById[action.id] = {
				...nodesById[action.id]!,
				expanded: false,
			};

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

			nodesById[action.id] = {
				...nodesById[action.id]!,
				expanded: false,
			};

			return {
				nodesById,
				nodeIds,
			};
		}
		default:
			return state;
	}
}
