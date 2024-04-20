import { useState } from 'react';

function useArray(defaultValue) {
	const [array, setArray] = useState(defaultValue)

	const push = (element) => setArray((prevValue) => [...prevValue, element])

	const filter = (callback) => setArray(a => a.filter(callback))

	const update = (index, newElement) => {
		setArray(prevValue => [
			...prevValue.slice(0, index),
			newElement,
			...prevValue.slice(index + 1, prevValue.length)
		])
	}

	const remove = (index) => {
		setArray(prevValue => [
			...prevValue.slice(0, index),
			...prevValue.slice(index + 1, prevValue.length - 1)
		])
	}

	const clear = () => setArray([])

	return { array, set: setArray, push, filter, update, remove, clear }
}

export default useArray;