import { useEffect, useState } from "react";

function useDocumentTitle(initialTitle) {
  const [title, setTitle] = useState(initialTitle || document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return [
    title,
    setTitle,
  ];
}

export default useDocumentTitle;