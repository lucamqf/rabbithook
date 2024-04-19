import { useRef, useEffect, EffectCallback } from "react"

type ICompareValue = Record<string, unknown>;
type ICompare= ICompareValue[] | ICompareValue;

function useDeepCompareEffect(callback: EffectCallback, dependencies: unknown[]) {
	const currentDependenciesRef = useRef<unknown[]>([])

	if (!deepCompare(currentDependenciesRef.current as ICompare, dependencies as ICompare)) {
		currentDependenciesRef.current = dependencies;
	}

	useEffect(callback, [currentDependenciesRef.current])
}

const deepCompare = (firstValue: ICompare, secondValue: ICompare) => {
  if (!isObject(firstValue) || !isObject(secondValue)) return firstValue === secondValue;

  const keys1 = Object.keys(firstValue)
  const keys2 = Object.keys(secondValue)

  if (keys1.length !== keys2.length) return false

  let areObjectsEqual = true;

  keys1.forEach(key => {
    const valueInObject1 = firstValue[key]
    const valueInObject2 = secondValue[key]

    const areObjects = isObject(valueInObject1) && isObject(valueInObject2)

    const areEqual = areObjects ? deepCompare(valueInObject1 as ICompareValue, valueInObject2 as ICompareValue) : valueInObject1 === valueInObject2

    if (areEqual) {
      areObjectsEqual = false;
    }
  })

  return areObjectsEqual;
}

const isObject = (value: any) => value !== null && typeof value === 'object';


export default useDeepCompareEffect;