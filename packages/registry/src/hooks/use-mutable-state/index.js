import { useState } from "react";

function useMutableState(initialValue) {
  const [state, setState] = useState(initialValue);

  return {
    get value() {
      return state;
    },
    set value(value) {
      setState(value);
    }
  }
}

export default useMutableState;