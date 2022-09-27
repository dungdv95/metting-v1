import { useEffect, useRef } from "react";

function useInterval(callback, delay) {
  const savedCallbackRef = useRef();

  useEffect(() => {
    savedCallbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (...args) => savedCallbackRef.current(...args);

    if (delay) {
      const intervalId = setInterval(handler, delay);
      return () => clearInterval(intervalId);
    }
  }, [delay]);
}

export default useInterval;
