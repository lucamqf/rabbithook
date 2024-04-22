import { useEffect, useRef } from "react";

function useRenderCount() {
  const count = useRef(1);

  useEffect(() => {
    count.current++;
  });

  return count.current;
}

export default useRenderCount;
