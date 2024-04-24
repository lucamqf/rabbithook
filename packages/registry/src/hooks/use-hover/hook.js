import { useState } from 'react';
import useEventListener from '../use-event-listener/hook';

function useHover(ref) {
  const [hovered, setHovered] = useState(false);

  useEventListener("mouseover", () => setHovered(true), ref);
  useEventListener("mouseout", () => setHovered(false), ref);

  return hovered;
}

export default useHover;