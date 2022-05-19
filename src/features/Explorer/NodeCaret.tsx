import Roact from "@rbxts/roact";
import { pure, useCallback, useEffect, useMemo, useMutable, useState } from "@rbxts/roact-hooked";
import { useDispatch } from "@rbxts/roact-rodux-hooked";

import {
	HierarchyNode,
	collapseNode,
	createNode,
	deleteNodeChild,
	expandNode,
	getNodeChildrenValues,
	insertNodeChild,
	selectNodeAncestorExpanded,
} from "reducers/hierarchy";
import { useBin } from "hooks/use-bin";
import { useRootSelector } from "hooks/use-root-store";

interface Props {
	node: HierarchyNode;
}

function NodeCaret({ node }: Props) {
	const bin = useBin();
	const dispatch = useDispatch();

	const isVisible = useRootSelector((state) => selectNodeAncestorExpanded(state, node.id));
	const [isExpanded, setIsExpanded] = useState(node.expanded);

	const [children, setChildren] = useState([] as HierarchyNode[]);
	const canExpand = useMemo(() => children.size() > 0, [children]);

	const isExpandedAndVisible = useMutable(isExpanded && isVisible);
	useEffect(() => {
		isExpandedAndVisible.current = isExpanded && isVisible;
	});

	// Listen to child removal
	const createChild = useCallback(
		(child: defined) => {
			const childNode = createNode(child, node.id);

			if (typeIs(child, "Instance")) {
				const ancestryChanged = child.AncestryChanged.Connect((_, parent) => {
					if (parent === node.value) {
						return;
					}

					setChildren((prev) => prev.filter((n) => n !== childNode));
					ancestryChanged.Disconnect();

					if (isExpandedAndVisible.current) {
						dispatch(deleteNodeChild(childNode.id));
					}
				});
				bin.add(ancestryChanged);
			}

			return childNode;
		},
		[node.value],
	);

	// Initialize children
	useEffect(() => {
		setChildren(getNodeChildrenValues(node).map(createChild));
	}, []);

	// Listen to child addition
	useEffect(() => {
		if (typeIs(node.value, "Instance")) {
			const childAdded = node.value.ChildAdded.Connect((child) => {
				const childNode = createChild(child);
				setChildren((prev) => [...prev, childNode]);

				if (isExpandedAndVisible.current) {
					dispatch(insertNodeChild(childNode, node.id));
				}
			});

			bin.add(childAdded);
		}
	}, []);

	// Dispatch action on expanded
	useEffect(() => {
		dispatch(isExpanded && isVisible ? expandNode(node.id, children) : collapseNode(node.id));
	}, [isExpanded, isVisible]);

	return (
		<>
			{canExpand && (
				<textbutton
					Event={{
						Activated: () => setIsExpanded((isExpanded) => !isExpanded),
					}}
					Text={isExpanded ? "v" : ">"}
					TextSize={20}
					Size={new UDim2(0, 20, 1, 0)}
				/>
			)}
		</>
	);
}

export default pure(NodeCaret);
