import { useState, useCallback } from "react";

type IUseStateWithValidation<T> = [
  T, 
  (nextState: T | ((value: T) => T)) => void, 
  boolean
];

function useStateWithValidation<T>(
  validationFunc: (value: T) => boolean,
  initialValue: T
): IUseStateWithValidation<T> {
  const [state, setState] = useState(initialValue);
  const [isValid, setIsValid] = useState(() => validationFunc(state));

  const onChange = useCallback(
    (nextState: T | ((value: T) => T)) => {
      const value = typeof nextState === "function" ? (nextState as (value: T) => T)(state) : nextState;
      
      setState(value);
      setIsValid(validationFunc(value));
    },
    [validationFunc]
  );

  return [state, onChange, isValid];
}

export default useStateWithValidation;
