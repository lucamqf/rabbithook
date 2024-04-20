import { useState } from 'react';
import useEventListener from './useEventListener';

function useHover(ref: Element) {
	const [hovered, setHovered] = useState(false);

  useEventListener("mouseover", () => setHovered(true), ref);
  useEventListener("mouseout", () => setHovered(false), ref);

	return hovered;
}


export default useHover;