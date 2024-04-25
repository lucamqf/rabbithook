import { useEffect, useState } from 'react';

function useQueryParams<T extends Record<string, unknown>>() {
  const [queryParams, setQueryParams] = useState({} as T);

  useEffect(() => {
      const params = {};
      const searchParams = new URLSearchParams(window.location.search);
      for (const param of searchParams) {
        const typeSafeParam = params as Record<string, unknown>;
        typeSafeParam[param[0]] = param[1];
      }
      setQueryParams(params as T);
  }, []);

  return queryParams;
}

export default useQueryParams;
