import { useEffect, useRef } from "react";

export default function useOutsideClick(handler, catchCapturing = true) {
  const ref = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    document.addEventListener("click", onClick, catchCapturing);

    return () => {
      document.removeEventListener("click", onClick, catchCapturing);
    };
  }, [handler, catchCapturing]);

  return ref;
}
