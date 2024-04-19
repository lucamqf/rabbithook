import { useEffect } from "react";

function useMount(callback) {
  useEffect(() => {
    callback()
  }, [])
}

export default useMount;