import { useState } from "react"

type IUseToggleReturnType = [boolean, (value?: boolean) => void];

function useToggle(defaultValue: boolean): IUseToggleReturnType {
	const [value, setValue] = useState(defaultValue);

	function toggleValue(value?: boolean) {
		setValue(currentValue => value ?? !currentValue);
	}

	return [value, toggleValue];
}

export default useToggle;