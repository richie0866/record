import Roact from "@rbxts/roact";
import { RunService } from "@rbxts/services";

export default function Root(props: Roact.PropsWithChildren) {
	if (!RunService.IsRunning()) {
		return (
			<frame Size={new UDim2(1, 0, 1, 0)} BackgroundTransparency={1}>
				{props[Roact.Children]}
			</frame>
		);
	}
	return (
		<screengui IgnoreGuiInset ResetOnSpawn={false} ZIndexBehavior="Sibling">
			{props[Roact.Children]}
		</screengui>
	);
}
