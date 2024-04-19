import { useEffect } from "react";
import useTimeout from "./useTimeout"

function useDebounce(callback: Function, delay: number, dependencies: any[]) {
	const { reset, clear } = useTimeout(callback, delay)

	useEffect(reset, [...dependencies, reset])
	useEffect(clear, [])
}


export default useDebounce;