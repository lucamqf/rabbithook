import { useState } from "react";
import useEventListener from "./use-event-listener";

function useOnlineStatus() {
	const [isOnline, setOnlineStatus] = useState(navigator.onLine);

	useEventListener("online", () => setOnlineStatus(navigator.onLine));
	useEventListener("offline", () => setOnlineStatus(navigator.onLine));

	return isOnline;
}

export default useOnlineStatus;