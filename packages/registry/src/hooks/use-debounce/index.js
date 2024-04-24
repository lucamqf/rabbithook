import { useEffect } from "react";
import useTimeout from "./useTimeout"

function useDebounce(callback, delay, dependencies) {
  const { reset, clear } = useTimeout(callback, delay);

  useEffect(reset, [...dependencies, reset])
  useEffect(clear, [])
}


export default useDebounce;