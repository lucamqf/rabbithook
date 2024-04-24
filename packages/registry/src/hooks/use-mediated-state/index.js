const { useState, useCallback } = require("react");

function useMediatedState(initialState, mediationFn) {
  const [state, setState] = useState(
    typeof initialState === "function"
      ? initialState(undefined)
      : initialState
  );

  const mediatedSetState = useCallback((value) => {
    const resolvedValue = typeof value === "function" ? value(state) : value;

    setState(mediationFn(resolvedValue));
  }, [mediationFn]);

  return [state, mediatedSetState];
}

export default useMediatedState;