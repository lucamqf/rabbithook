import { useEffect, useRef } from "react";

export type IEventMap = HTMLElementEventMap;

export type IEventElement = (Window & typeof globalThis) | Element | null;

function useEventListener<K extends keyof IEventMap>(
  eventType: K,
  callback: (ev: IEventMap[K]) => void,
  element: IEventElement = window
) {
  const callbackRef = useRef<(event: IEventMap[K]) => void>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (e: IEventMap[K]) => callbackRef.current(e);

    element?.addEventListener(eventType as string, handler as EventListener);

    return () => {
      element?.removeEventListener(eventType as string, handler as EventListener);
    };
  }, [eventType, element]);
}

export default useEventListener;