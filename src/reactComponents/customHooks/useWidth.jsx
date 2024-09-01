import { useState, useEffect, useRef } from 'react';

function useWidth(ref) {
  const [width, setWidth] = useState(0);
  const resizeObserver = useRef(null);

  useEffect(() => {
    resizeObserver.current = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === ref.current) {
          setWidth(entry.contentRect.width);
        }
      }
    });

    if (ref.current) {
      resizeObserver.current.observe(ref.current);
    }

    const newRef = ref.current
    return () => {
      if (resizeObserver.current && newRef) {
        resizeObserver.current.unobserve(newRef);
      }
    };
  }, [ref]);

  return width;
}

export default useWidth;



