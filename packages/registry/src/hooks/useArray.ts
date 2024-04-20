import { useState } from 'react';

function useArray<T = unknown>(defaultValue: T[]) {
	const [array, setArray] = useState(defaultValue)

	const push = (element: T) => setArray((prevValue: T[]) => [...prevValue, element])

	const filter = (callback: (value: T, index: number, array: T[]) => boolean) => setArray(a => a.filter(callback))

	const update = (index: number, newElement: T) => {
		setArray(prevValue => [
			...prevValue.slice(0, index),
			newElement,
			...prevValue.slice(index + 1, prevValue.length)
		])
	}

	const remove = (index: number) => {
		setArray(prevValue => [
			...prevValue.slice(0, index),
			...prevValue.slice(index + 1, prevValue.length - 1)
		])
	}

	const clear = () => setArray([])

	return { array, set: setArray, push, filter, update, remove, clear }
}

export default useArray;