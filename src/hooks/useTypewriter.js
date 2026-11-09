import { useCallback, useEffect, useRef, useState } from 'react';

export function useTypewriter(text = '', { speed = 20, enabled = true } = {}) {
  const [count, setCount] = useState(enabled ? 0 : text.length);
  const timerRef = useRef(null);

  useEffect(() => {
    setCount(enabled ? 0 : text.length);
    if (!enabled || !text) return undefined;

    timerRef.current = window.setInterval(() => {
      setCount((current) => {
        if (current >= text.length) {
          window.clearInterval(timerRef.current);
          return current;
        }
        return current + 1;
      });
    }, speed);

    return () => window.clearInterval(timerRef.current);
  }, [text, speed, enabled]);

  const skip = useCallback(() => {
    window.clearInterval(timerRef.current);
    setCount(text.length);
  }, [text]);

  return {
    displayed: text.slice(0, count),
    done: count >= text.length,
    skip,
  };
}
