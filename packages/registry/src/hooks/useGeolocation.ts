import { useState, useEffect } from "react"

type IUseGeolocationProps = PositionOptions;

type IGeolocation = {
	latitude: number;
	longitude: number;
	altitude: number | null;
	speed: number | null;
}

function useGeolocation(options?: IUseGeolocationProps = {}) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<GeolocationPositionError | null>(null);
	const [data, setData] = useState({} as IGeolocation);

	useEffect(() => {
		const successHandler = (event: GeolocationPosition) => {
			const { latitude, longitude, altitude, speed } = event.coords;
			setLoading(false);
			setError(null);
			setData({ latitude, longitude, altitude, speed });
		}

		const errorHandler = (error: GeolocationPositionError) => {
			setLoading(false);
			setError(error);
		}

		navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options);
		const id = navigator.geolocation.watchPosition(successHandler, errorHandler, options);

		return () => navigator.geolocation.clearWatch(id);
	}, [options])

	return { loading, error, data }
}


export default useGeolocation;