import useEventListener from "./useEventListener";

function useKeyStroke(key, handler) {
  useEventListener("keydown", (e) => {
    const keys = Array.isArray(key) ? key : [key];

    if (keys.includes(e.key)) {
      handler(e);
    }
  });
}

export default useKeyStroke;