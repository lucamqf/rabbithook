import { useRef, useEffect, useCallback } from 'react';

function useThrottledCallback(callback, delay) {
  const lastCallTimeRef = useRef<number | null>(null);

  const throttledCallback = useCallback((...args) => {
      if (lastCallTimeRef.current == null || Date.now() - lastCallTimeRef.current >= delay) {
          callback(...args);
          lastCallTimeRef.current = Date.now();
      }
  }, [callback, delay]);

  useEffect(() => {
      return () => {
          lastCallTimeRef.current = null;
      };
  }, []);

  return throttledCallback;
}

export default useThrottledCallback;
