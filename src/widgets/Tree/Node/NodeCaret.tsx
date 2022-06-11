import Roact from "@rbxts/roact";
import { UserInputService } from "@rbxts/services";
import { collapseNode, deepCollapseNode, expandNode } from "reducers/tree";
import { pure, useCallback, useState } from "@rbxts/roact-hooked";
import { useRootDispatch } from "hooks/use-root-store";

interface Props {
	id: number;
	size: number;
	defaultExpanded: boolean;
}

function NodeCaret({ id, size, defaultExpanded }: Props) {
	const dispatch = useRootDispatch();
	const [expanded, setExpanded] = useState(defaultExpanded);

	const isExpandable = size > 0;

	const toggleExpanded = useCallback(() => {
		setExpanded(!expanded);
		if (expanded) {
			if (UserInputService.IsKeyDown(Enum.KeyCode.LeftAlt)) {
				dispatch(deepCollapseNode(id));
			} else {
				dispatch(collapseNode(id));
			}
		} else {
			dispatch(expandNode(id));
		}
	}, [expanded, id, dispatch]);

	return (
		<>
			{isExpandable && (
				<textbutton
					Event={{
						Activated: toggleExpanded,
					}}
					Text={expanded ? "v" : ">"}
					TextSize={20}
					Size={new UDim2(0, 20, 1, 0)}
					BorderSizePixel={0}
				/>
			)}
		</>
	);
}

export default pure(NodeCaret);
