import { useState } from "react";

function useClipboard() {
  const [clipboardState, setClipboardState] = useState("");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setClipboardState(text);
      })
      .catch((error) => {
        console.error("Failed to copy to clipboard:", error);
      });
  };

  const clearClipboard = () => {
    navigator.clipboard.writeText("")
      .then(() => {
        setClipboardState("");
      })
      .catch((error) => {
        console.error("Failed to clear clipboard:", error);
      });
  };

  const readClipboard = () => {
    navigator.clipboard.readText()
      .then((value) => {
        setClipboardState(value);
      })
      .catch((error) => {
        console.error("Failed to read clipboard:", error);
      });
  };

  return {
    value: clipboardState,
    copyToClipboard,
    clearClipboard,
    readClipboard,
  };
};

export default useClipboard;