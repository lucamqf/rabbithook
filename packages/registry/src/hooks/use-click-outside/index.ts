import { useState } from "react";
import useEventListener from "../use-event-listener";

function useClickOutside(ref: React.RefObject<HTMLElement>) {
  const [clickedOutside, setClickedOutside] = useState(false);

  function handleClickOutside(event: MouseEvent) {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setClickedOutside(true);

      return;
    }

    setClickedOutside(false);
  }

  useEventListener("mousedown", handleClickOutside);

  return clickedOutside;
}

export default useClickOutside;