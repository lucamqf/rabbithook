import { useCallback, useState, useEffect } from "react"

function useAsync(callback, dependencies = []) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [value, setValue] = useState(null);

	const callbackMemoized = useCallback(() => {
		setLoading(true);
		setError(null);
		setValue(null);
		callback()
			.then(setValue)
			.catch(setError)
			.finally(() => setLoading(false))
	}, dependencies)

	useEffect(() => {
		callbackMemoized();
	}, [callbackMemoized])

	return { loading, error, value }
}

export default useAsync;