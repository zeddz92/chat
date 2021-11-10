import { useEffect, useState } from "react";

export const getItem = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  if (item) {
    return JSON.parse(item);
  }
  return null;
};
export function useLocalStorage<T = string>(
  key: string,
  defaultValue: T
): [T, typeof setItem] {
  const [state, setState] = useState<T>(defaultValue);

  useEffect(() => {
    const item = getItem<T>(key);
    if (item) {
      setState(item);
    }
  }, [key]);

  const setItem = (key: string, value: T) => {
    setState(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [state, setItem];
}
