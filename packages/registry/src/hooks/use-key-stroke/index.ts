import useEventListener from "../use-event-listener";

type IKeyStrokeKey = string | string[];
type IKeyStrokeHandler = (e: KeyboardEvent) => void;

function useKeyStroke(key: IKeyStrokeKey, handler: IKeyStrokeHandler) {
  useEventListener("keydown", (e) => {
    const keys = Array.isArray(key) ? key : [key];

    if (keys.includes(e.key)) {
      handler(e);
    }
  });
}

export default useKeyStroke;