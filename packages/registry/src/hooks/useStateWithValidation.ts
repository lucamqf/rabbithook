import { useState, useCallback } from "react"

type IUseStateWithValidation<T> = [T, (nextState: (value: T) => T | T) => void, boolean];

function useStateWithValidation<T>(validationFunc: (value: T) => boolean, initialValue: T): IUseStateWithValidation<T> {
	const [state, setState] = useState(initialValue);
	const [isValid, setIsValid] = useState(() => validationFunc(state));

	const onChange = useCallback((nextState: (value: T) => T | T) => {
		const value = typeof nextState === "function" ? nextState(state) : nextState;

		setState(value);
		setIsValid(validationFunc(value));
	}, [validationFunc])

	return [state, onChange, isValid];
}


export default useStateWithValidation;