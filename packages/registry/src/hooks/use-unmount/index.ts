import { useEffect, useRef } from "react";

function useUnMount(cb: () => void) {
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      if (mountedRef.current) {
        mountedRef.current = false;
        cb();
      }
    };
  }, [cb]);
}

export default useUnMount;