import { useCallback, useRef } from 'react';

export function useThrottle<T extends (...args: any[]) => void>(
  callback: T,
  delay: number = 500
): T {
  const lastRan = useRef<number>(Date.now());

  return useCallback(
    ((...args) => {
      const now = Date.now();

      if (now - lastRan.current >= delay) {
        callback(...args);
        lastRan.current = now;
      }
    }) as T,
    [callback, delay]
  );
}

