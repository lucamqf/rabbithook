import { RefObject, useState, useEffect } from "react";

interface ISize {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
}

function useSize(ref: RefObject<Element>) {
  const [size, setSize] = useState({} as ISize);

  useEffect(() => {
    if (ref.current == null) return;

    const observer = new ResizeObserver(([entry]) => setSize(entry.contentRect));
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [])

  return size;
}

export default useSize;