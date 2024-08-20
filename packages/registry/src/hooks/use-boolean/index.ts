import { useState } from "react"

type IUseBooleanReturnType = [boolean, (value?: boolean) => void];

function useBoolean(defaultValue: boolean): IUseBooleanReturnType {
  const [value, setValue] = useState(defaultValue);

  function toggleValue(value?: boolean) {
    setValue(prev => value ?? !prev);
  }

  return [value, toggleValue];
}

export default useBoolean;