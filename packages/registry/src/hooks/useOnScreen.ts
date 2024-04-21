import { RefObject, useEffect, useState } from "react";

function useOnScreen(ref: RefObject<Element>, offset = 0) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: `${offset}px` }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, offset]);

  return isVisible;
}

export default useOnScreen;
