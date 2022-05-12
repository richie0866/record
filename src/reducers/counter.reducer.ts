export interface CounterState {
	count: number;
}

type CounterAction = ReturnType<typeof increment> | ReturnType<typeof decrement> | ReturnType<typeof reset>;

export function increment() {
	return { type: "INCREMENT" };
}

export function decrement() {
	return { type: "DECREMENT" };
}

export function reset() {
	return { type: "RESET" };
}

const initialState: CounterState = { count: 0 };

export default function counterReducer(state = initialState, action: CounterAction): CounterState {
	switch (action.type) {
		case "INCREMENT":
			return { count: state.count + 1 };
		case "DECREMENT":
			return { count: state.count - 1 };
		case "RESET":
			return { count: 0 };
		default:
			return state;
	}
}
