import { makeSelectNodePosition, makeSelectNodeSize, makeSelectNodeVisible, selectNode } from "reducers/tree";
import { useMemo } from "@rbxts/roact-hooked";
import { useRootSelector } from "hooks/use-root-store";

export function useNode(id: number) {
	return useRootSelector((state) => selectNode(state, id)!);
}

export function useNodeVisible(id: number) {
	const selector = useMemo(makeSelectNodeVisible, []);
	return useRootSelector((state) => selector(state, id));
}

export function useNodePosition(id: number) {
	const selector = useMemo(makeSelectNodePosition, []);
	return useRootSelector((state) => selector(state, id));
}

export function useNodeSize(id: number) {
	const selector = useMemo(makeSelectNodeSize, []);
	return useRootSelector((state) => selector(state, id));
}
