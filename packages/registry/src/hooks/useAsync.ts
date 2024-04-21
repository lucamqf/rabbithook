import { useCallback, useEffect, useState } from "react"

type AsyncState<T> = {
  loading: boolean;
  error: string | null;
  value: T | null;
}

function useAsync<T>(callback: () => Promise<T>, dependencies: unknown[] = []): AsyncState<T> {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState<T | null>(null);

  const callbackMemoized = useCallback(() => {
    setLoading(true);
    setError(null);
    setValue(null);
    callback()
      .then(setValue)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [...dependencies, callback])

  useEffect(() => {
    callbackMemoized();
  }, [callbackMemoized])

  return { loading, error, value }
}

export default useAsync;