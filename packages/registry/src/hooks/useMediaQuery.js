import { useState, useEffect } from "react";

function useMediaQuery(mediaQuery) {
  const [isMatch, setIsMatch] = useState(false);
  const [mediaQueryList, setMediaQueryList] = useState(window.matchMedia(mediaQuery));

  useEffect(() => {
    const list = window.matchMedia(mediaQuery)
    setMediaQueryList(list)
    setIsMatch(list.matches)
  }, [mediaQuery])

  useEffect(() => {
    if (mediaQueryList === null) return;

    mediaQueryList.addEventListener("change", event => setIsMatch(event.matches))

    return () => mediaQueryList.removeEventListener("change", event => setIsMatch(event.matches))
  }, [mediaQueryList])

  return isMatch
}


export default useMediaQuery;