import { useCallback, useEffect } from 'react';

export default function useDebounce(
  callback: Function,
  timeout: number = 1000
) {
  let timerId: NodeJS.Timeout | null = null;

  useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);

  function debounce() {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      callback();
      clearTimeout(timerId as NodeJS.Timeout);
    }, timeout);
  }

  return useCallback(() => {
    debounce();
  }, []);
}
