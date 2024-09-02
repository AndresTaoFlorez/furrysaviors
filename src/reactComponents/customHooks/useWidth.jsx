import { useState, useEffect, useRef } from 'react';

function useWidth(ref) {
  const [width, setWidth] = useState(0);
  const resizeObserver = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    resizeObserver.current = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === ref.current) {
          setWidth(entry.contentRect.width);
        }
      }
    });

    resizeObserver.current.observe(ref.current);

    return () => {
      if (resizeObserver.current && ref.current) {
        resizeObserver.current.unobserve(ref.current);
      }
    };
  }, [ref.current]);

  return width;
}

export default useWidth;
