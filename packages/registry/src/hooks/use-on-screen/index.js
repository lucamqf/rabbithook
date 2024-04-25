import { useEffect, useState } from "react";

function useOnScreen(ref, offset = 0) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (ref.current == null) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: `${offset}px` }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current == null) return;

      observer.unobserve(ref.current);
    }
  }, [ref.current, offset])

  return isVisible;
}

export default useOnScreen;