import { useRef, useEffect } from "react";

function useEventListener(eventType: string, callback: Function, element: Element | Window | null = window) {
  const callbackRef = useRef(callback);

  useEffect(() => {
	callbackRef.current = callback;
  }, [callback])

  useEffect(() => {
	if (!element) return;

	const handler = (event: Event) => callbackRef.current(event);

	element.addEventListener(eventType, handler);

	return () => element.removeEventListener(eventType, handler);
  }, [eventType, element])
}

export default useEventListener;