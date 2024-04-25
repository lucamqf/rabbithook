import { useEffect, useState } from "react";

type useDocumentTitle = [
  string,
  React.Dispatch<React.SetStateAction<string>> 
]
function useDocumentTitle(initialTitle?: string):useDocumentTitle {
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