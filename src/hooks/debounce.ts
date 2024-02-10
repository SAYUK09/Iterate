export function useDebounce<T extends (...args: any[]) => any>(
    fn: T,
    delay: number = 1000
  ) {
    return (...args: any[]) => {
      let timeoutId: number;
      return () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          fn(...args);
        }, delay);
      };
    };
  }