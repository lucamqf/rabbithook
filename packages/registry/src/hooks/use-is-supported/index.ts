import { useState } from "react"

import useMount from "../use-mount"

export function useIsSupported(predicate: () => boolean) {
  const [isSupported, setIsSupported] = useState(false)

  useMount(() => {
    setIsSupported(predicate())
  })

  return isSupported
}