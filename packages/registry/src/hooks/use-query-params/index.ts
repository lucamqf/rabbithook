import { useEffect, useState } from 'react';

function useQueryParams<T extends Record<string, unknown>>() {
  const [queryParams, setQueryParams] = useState({} as T);

  useEffect(() => {
      const params = {};
      const searchParams = new URLSearchParams(window.location.search);
      for (let param of searchParams) {
          params[param[0]] = param[1];
      }
      setQueryParams(params as T);
  }, []);

  return queryParams;
}

export default useQueryParams;
