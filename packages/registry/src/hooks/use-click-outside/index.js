import { useState } from "react";
import useEventListener from "../use-event-listener";

function useClickOutside(ref) {
  const [clickedOutside, setClickedOutside] = useState(false);

  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      setClickedOutside(true);

      return;
    }

    setClickedOutside(false);
  }

  useEventListener("mousedown", handleClickOutside);

  return clickedOutside;
}

export default useClickOutside;