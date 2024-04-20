import { useEffect, useRef } from 'react'

export function useInterval(
  callback,
  delay,
  options
) {
  const { immediate = false, paused = false } = options || {}
  const savedCallback = useRef(callback)
  const tickId = useRef()

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