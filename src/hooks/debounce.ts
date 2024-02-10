import { useState } from "react";

export function useDebounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 1000
) {
  const [timeoutId, setTimeoutId] = useState<number | undefined>(undefined);

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    const id = setTimeout(() => {
      fn(...args);
    }, delay);
    setTimeoutId(id);
  };
}

