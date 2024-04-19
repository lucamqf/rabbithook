import { useState } from "react";
import useEventListener from "./useEventListener";

function useOnlineStatus() {
	const [isOnline, setOnlineStatus] = useState(navigator.onLine);

	useEventListener("online", () => setOnlineStatus(navigator.onLine));
	useEventListener("offline", () => setOnlineStatus(navigator.onLine));

	return isOnline;
}

export default useOnlineStatus;