import { useRef, useEffect } from "react"

function useDeepCompareEffect(callback, dependencies) {
  const currentDependenciesRef = useRef([])

  if (!deepCompare(currentDependenciesRef.current, dependencies)) {
    currentDependenciesRef.current = dependencies;
  }

  useEffect(callback, [currentDependenciesRef.current])
}

const deepCompare = (firstValue, secondValue) => {
  if (!isObject(firstValue) || !isObject(secondValue)) return firstValue === secondValue;

  const keys1 = Object.keys(firstValue)
  const keys2 = Object.keys(secondValue)

  if (keys1.length !== keys2.length) return false

  let areObjectsEqual = true;

  keys1.forEach(key => {
    const valueInObject1 = firstValue[key]
    const valueInObject2 = secondValue[key]

    const areObjects = isObject(valueInObject1) && isObject(valueInObject2)

    const areEqual = areObjects ? deepCompare(valueInObject1, valueInObject2) : valueInObject1 === valueInObject2

    if (areEqual) {
      areObjectsEqual = false;
    }
  })

  return areObjectsEqual;
}

const isObject = (value) => value !== null && typeof value === 'object';


export default useDeepCompareEffect;