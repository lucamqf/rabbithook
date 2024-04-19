import { useEffect } from "react";

function useMount(callback: Function) {
	useEffect(() => {
		callback()
	}, [])
}

export default useMount;