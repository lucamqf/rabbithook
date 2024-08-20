import { useState, useCallback } from 'react';

function useQueryState<T>(key: string, defaultValue: T) {
  const [state, setState] = useState<T>(() => {
    const queryParam = getQueryParam(key);
    if (queryParam !== undefined) {
      return queryParam;
    } else {
      setQueryParam(key, defaultValue);
      return defaultValue;
    }
  });

  function getQueryParam(key: string): T | undefined {
    const params = new URLSearchParams(window.location.search);
    const value = params.get(key);

    if (value !== null) {
      try {
        return JSON.parse(value) as T;
      } catch {
        return value as T;
      }
    }
  }

  function setQueryParam(key: string, value: T) {
    const params = new URLSearchParams(window.location.search);
    params.set(key, typeof value === 'string' ? value : JSON.stringify(value));
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  }

  const handleStateChange = useCallback((value: T | ((prevState: T) => T)) => {
    setState(prevState => {
      const newValue = typeof value === 'function' ? (value as (prevState: T) => T)(prevState) : value;
      setQueryParam(key, newValue);
      return newValue;
    });
  }, [key]);

  return [state, handleStateChange] as const;
}

export default useQueryState;