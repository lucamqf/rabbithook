import { useState, useCallback } from 'react';

function useQueryState(key, defaultValue) {
  const [state, setState] = useState(() => {
    const queryParam = getQueryParam(key);
    if (queryParam !== undefined) {
      return queryParam;
    } else {
      setQueryParam(key, defaultValue);
      return defaultValue;
    }
  });

  function getQueryParam(key) {
		const params = new URLSearchParams(window.location.search);
    const value = params.get(key);

    if (value !== null) {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
  }

  function setQueryParam(key, value) {
    const params = new URLSearchParams(window.location.search);
    params.set(key, typeof value === 'string' ? value : JSON.stringify(value));
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  }

  const handleStateChange = useCallback((value) => {
    setState(prevState => {
      const newValue = typeof value === 'function' ? value(prevState) : value;
      setQueryParam(key, newValue);
      return newValue;
    });
  }, [key]);

  return [state, handleStateChange];
}

export default useQueryState;