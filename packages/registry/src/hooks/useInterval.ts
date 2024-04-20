import { useEffect, useRef } from 'react'

type UseIntervalOptions = {
  immediate: boolean
  paused: boolean
}

export function useInterval<T extends () => void>(
  callback: T,
  delay: number,
  options?: Partial<UseIntervalOptions>
) {
  const { immediate = false, paused = false } = options || {}
  const savedCallback = useRef(callback)
  const tickId = useRef<NodeJS.Timeout>()

  useEffect(() => {
    savedCallback.current = callback

    if (!paused && immediate) {
      callback()
    }
  }, [callback, immediate, paused])

  useEffect(() => {
    if (tickId.current && paused) {
      clearInterval(tickId.current)
      return
    }

    tickId.current = setInterval(() => savedCallback.current(), delay)

    return () => tickId.current && clearInterval(tickId.current)
  }, [delay, paused])
}