import { useEffect, useState } from 'react';

function useQueryParams() {
  const [queryParams, setQueryParams] = useState({});

  useEffect(() => {
      const params = {};
      const searchParams = new URLSearchParams(window.location.search);
      for (let param of searchParams) {
          params[param[0]] = param[1];
      }
      setQueryParams(params);
  }, []);

  return queryParams;
}

export default useQueryParams;
