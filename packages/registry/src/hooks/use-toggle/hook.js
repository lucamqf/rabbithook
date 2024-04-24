import { useState } from "react"

function useToggle(defaultValue) {
  const [value, setValue] = useState(defaultValue);

  function toggleValue(value) {
    setValue(currentValue => value ?? !currentValue);
  }

  return [value, toggleValue];
}

export default useToggle;