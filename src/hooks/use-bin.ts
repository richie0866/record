import { Bin } from "@rbxts/bin";
import { useEffect, useMemo } from "@rbxts/roact-hooked";

export function useBin() {
	const bin = useMemo(() => new Bin(), []);
	useEffect(() => {
		return () => bin.destroy();
	}, []);
	return bin;
}
