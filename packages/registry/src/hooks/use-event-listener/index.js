import { useRef, useEffect } from "react";

function useEventListener(eventType, callback, element = window) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback])

  useEffect(() => {
    if (!element) return;

    const handler = (event) => callbackRef.current(event);

    element.addEventListener(eventType, handler);

    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element])
}

export default useEventListener;