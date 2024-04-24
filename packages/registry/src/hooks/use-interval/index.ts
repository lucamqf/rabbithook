import { useEffect, useRef } from "react"

type UseIntervalOptions = {
  immediate: boolean
  startPaused: boolean
}

function useInterval<T extends () => void>(
  callback: T,
  delay: number,
  { immediate, startPaused }: Partial<UseIntervalOptions> = { immediate: false, startPaused: false }
) {
  const savedCallback = useRef(callback);
  const tickId = useRef<NodeJS.Timeout>();

  function start() {
    if (!tickId.current) {
      tickId.current = setInterval(() => savedCallback.current(), delay);
    }
  }

  function stop() {
    if (tickId.current) {
      clearInterval(tickId.current);
      tickId.current = undefined;
    }
  }

  useEffect(() => {
    savedCallback.current = callback;

    if (immediate) {
      callback();
    }
  }, [callback, immediate])

  useEffect(() => {
    if (!tickId.current && startPaused) {
      return;
    }

    start();

    return stop;
  }, [delay, startPaused])

  return {
    startTimer: start,
    stopTimer: stop,
  }
}

export default useInterval;