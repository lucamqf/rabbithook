import { useState } from "react";

interface IUseMutableState<T> {
  value: T;
}

function useMutableState<T>(initialValue: T): IUseMutableState<T> {
  const [state, setState] = useState(initialValue);

  return {
    get value() {
      return state;
    },
    set value(value: T) {
      setState(value);
    }
  }
}

export default useMutableState;