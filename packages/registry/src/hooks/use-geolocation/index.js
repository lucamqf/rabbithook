import { useState, useEffect } from "react"

function useGeolocation(options) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});

  useEffect(() => {
    const successHandler = (event) => {
      const { latitude, longitude, altitude, speed } = event.coords;
      setLoading(false);
      setError(null);
      setData({ latitude, longitude, altitude, speed });
    }

    const errorHandler = (error) => {
      setLoading(false);
      setError(error);
    }

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options);
    const id = navigator.geolocation.watchPosition(successHandler, errorHandler, options);

    return () => navigator.geolocation.clearWatch(id);
  }, [options])

  return { loading, error, data };
}

export default useGeolocation;