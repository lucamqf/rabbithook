import { useEffect, useRef } from "react";

function useUnMount(cb) {
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