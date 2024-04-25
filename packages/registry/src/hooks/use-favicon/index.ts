import { useEffect, useState } from "react";

function useFavicon() {
  const [href , setHref] = useState('');

  useEffect(() => {
    const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    if (link) {
      link.href = href;
    }
  },[href])

  return setHref;
}

export default useFavicon;
