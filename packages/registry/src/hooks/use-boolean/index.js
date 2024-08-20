import { useState } from "react"

function useBoolean(defaultValue) {
  const [value, setValue] = useState(defaultValue);

  function toggleValue(value) {
    setValue(prev => value ?? !prev);
  }

  return [value, toggleValue];
}

export default useBoolean;