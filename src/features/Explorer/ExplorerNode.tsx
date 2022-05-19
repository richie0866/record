import Roact from "@rbxts/roact";
import { hooked, useEffect, useState } from "@rbxts/roact-hooked";

import NodeCaret from "./NodeCaret";
import { HierarchyNode, selectNodeDepth } from "reducers/hierarchy";
import { useRootSelector } from "hooks/use-root-store";

interface Props {
	node: HierarchyNode;
	order: number;
}

function ExplorerNode({ node, order }: Props) {
	const depth = useRootSelector((state) => selectNodeDepth(state, node.id));

	const [name, setName] = useState(tostring(node.value));

	// Update name
	useEffect(() => {
		const value = node.value;
		if (!typeIs(value, "Instance")) {
			return;
		}

		const nameChanged = value.GetPropertyChangedSignal("Name").Connect(() => {
			setName(value.Name);
		});

		return () => {
			nameChanged.Disconnect();
		};
	}, [node.value]);

	return (
		<frame Size={new UDim2(0, 480 - depth * 30, 0, 50)} Position={new UDim2(0, depth * 30, 0, order * 50)}>
			<textlabel
				Text={name}
				TextSize={20}
				TextXAlignment="Left"
				Size={new UDim2(1, -30, 1, 0)}
				Position={new UDim2(0, 30, 0, 0)}
			/>
			<NodeCaret node={node} />
		</frame>
	);
}

export default hooked(ExplorerNode);
