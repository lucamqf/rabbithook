import { useState } from "react";
import useEventListener from "./useEventListener";

const defaultValue = { angle: 0, type: "landscape-primary" };

const getOrientation = () => {
  const { orientation } = window.screen;

  if (orientation) return { angle: orientation.angle, type: orientation.type };
  if (window.orientation) return { angle: typeof window.orientation === "number" ? window.orientation : 0, type: "" };

  return null;
}

function useOrientation(initialState = defaultValue) {
  const [orientation, setOrientation] = useState(getOrientation() || initialState);

  function handleChange() {
    setOrientation(getOrientation() || initialState);
  }

  useEventListener("orientationchange", handleChange);

  return orientation;
}

export default useOrientation;