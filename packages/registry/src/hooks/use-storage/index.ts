import { Dispatch, SetStateAction, useState, useEffect, useCallback } from "react";

type IUseStorageReturnType<T> = [T | null, Dispatch<SetStateAction<T | null>>, () => void];
type IStorageType = typeof localStorage | typeof sessionStorage;

function useLocalStorage<T>(key: string, defaultValue: T): IUseStorageReturnType<T> {
  return useStorage(key, defaultValue, window.localStorage);
}

function useSessionStorage<T>(key: string, defaultValue: T): IUseStorageReturnType<T> {
  return useStorage(key, defaultValue, window.sessionStorage);
}

function useStorage<T>(key: string, defaultValue: T, storageObject: IStorageType): IUseStorageReturnType<T> {
  const [value, setValue] = useState<T | null>(() => {

    if(key === null || key === undefined) {
      return typeof defaultValue === "function" ? defaultValue() : defaultValue;
    }

    const jsonValue = storageObject.getItem(key);

    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof defaultValue === "function") {
      return defaultValue();
    }

    return defaultValue;
  });

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key);
    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject])

  const remove = useCallback(() => {
    setValue(null);
  }, [])

  return [value, setValue, remove]
}

export { useLocalStorage, useSessionStorage };
export default useStorage;