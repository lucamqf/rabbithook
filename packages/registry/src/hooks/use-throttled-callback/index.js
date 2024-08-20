/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';

function useThrottledCallback(cb, delay, dependencyArray) {
  const lastExecutedRef = useRef(0);
  const cbRef = useRef(cb);
  const paramsRef = useRef();

  useEffect(() => {
    const now = Date.now();
    const timeSinceLastExecution = now - lastExecutedRef.current;

    if (timeSinceLastExecution >= delay) {
      cbRef.current(paramsRef.current);
      lastExecutedRef.current = now;
    } else {
      const timeoutId = setTimeout(() => {
        cbRef.current(paramsRef.current);
        lastExecutedRef.current = Date.now();
      }, delay - timeSinceLastExecution);

      return () => clearTimeout(timeoutId);
    }
  }, [...dependencyArray, delay]);

  function setThrottledCallbackParams(params) {
    paramsRef.current = params;
  }

  return setThrottledCallbackParams;
}

export default useThrottledCallback;