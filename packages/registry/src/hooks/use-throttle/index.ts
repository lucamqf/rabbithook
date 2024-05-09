import { useRef, useEffect, useCallback } from "react";

type Callback = (...args: any[]) => void;

function useThrottle(callback: Callback, delay: number): Callback {
  const lastCallTimeRef = useRef<number | null>(null);

  const throttledCallback = useCallback(
    (...args: any[]) => {
      if (
        lastCallTimeRef.current == null ||
        Date.now() - lastCallTimeRef.current >= delay
      ) {
        callback(...args);
        lastCallTimeRef.current = Date.now();
      }
    },
    [callback, delay]
  );

  useEffect(() => {
    return () => {
      lastCallTimeRef.current = null;
    };
  }, []);

  return throttledCallback;
}

export default useThrottle;
