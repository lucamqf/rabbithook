import { useRef, useState } from "react";
import useEventListener from "../use-event-listener";

function useIdle(delay: number) {
  const idleTimeout = useRef<NodeJS.Timeout | null>(null);

  const [isIdle, setIsIdle] = useState(false);

  function handleMouseMove() {
    setIsIdle(false);

    if (idleTimeout.current) {
      clearTimeout(idleTimeout.current);
    }

    idleTimeout.current = setTimeout(() => {
      setIsIdle(true);
    }, delay);
  }

  useEventListener("mousemove", handleMouseMove);

  return isIdle;
}

export default useIdle;