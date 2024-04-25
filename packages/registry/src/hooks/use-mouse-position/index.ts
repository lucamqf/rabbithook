import { useEffect, useState } from "react";

type MousePosition = {
  x: number;
  y: number;
};

function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({} as MousePosition);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mousePosition;
}

export default useMousePosition;
