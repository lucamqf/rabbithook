import { useEffect, useRef, useState } from 'react';

function useThrottledValue(value, delay) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecutedRef = useRef(0);

  useEffect(() => {
    const now = Date.now();
    const timeSinceLastExecution = now - lastExecutedRef.current;

    if (timeSinceLastExecution >= delay) {
      setThrottledValue(value);
      lastExecutedRef.current = now;
    } else {
      const timeoutId = setTimeout(() => {
        setThrottledValue(value);
        lastExecutedRef.current = Date.now();
      }, delay - timeSinceLastExecution);

      return () => clearTimeout(timeoutId);
    }
  }, [value, delay]);

  return throttledValue;
}

export default useThrottledValue;