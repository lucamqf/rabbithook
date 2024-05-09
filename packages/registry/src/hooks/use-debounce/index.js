import { useEffect } from "react";
import useTimeout from "../use-timeout";

function useDebounce(callback, delay, dependencies) {
  const { reset, clear } = useTimeout(callback, delay);

  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, []);
}

export default useDebounce;
