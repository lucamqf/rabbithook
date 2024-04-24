import { useCallback, useState } from "react";

type IMediationFn<T> = (value: T) => T;
type IMediatedState<T> = T | IMediationFn<T>;

function useMediatedState<T>(initialState: IMediatedState<T>, mediationFn: (value: T) => T) {
  const [state, setState] = useState(
    typeof initialState === "function"
      ? (initialState as IMediationFn<T>)(undefined as T)
      : initialState
  );

  const mediatedSetState = useCallback((value: IMediatedState<T>) => {
    const resolvedValue = typeof value === "function" ? (value as IMediationFn<T>)(state) : value;

    setState(mediationFn(resolvedValue));
  }, [mediationFn]);

  return [state, mediatedSetState] as const;
}

export default useMediatedState;