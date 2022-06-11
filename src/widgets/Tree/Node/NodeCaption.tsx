import Roact from "@rbxts/roact";
import { pure, useBinding, useEffect } from "@rbxts/roact-hooked";

interface Props {
	value: defined;
}

function NodeCaption({ value }: Props) {
	const [name, setName] = useBinding(tostring(value));

	useEffect(() => {
		if (!typeIs(value, "Instance")) {
			return;
		}

		const handle = value.GetPropertyChangedSignal("Name").Connect(() => {
			setName(value.Name);
		});

		return () => {
			handle.Disconnect();
		};
	}, [value]);

	return (
		<textlabel
			Text={name.map((n) => `🔥 ${n}`)}
			TextSize={20}
			TextXAlignment="Left"
			Size={new UDim2(1, -30, 1, 0)}
			Position={new UDim2(0, 30, 0, 0)}
			BorderSizePixel={0}
		/>
	);
}

export default pure(NodeCaption);
