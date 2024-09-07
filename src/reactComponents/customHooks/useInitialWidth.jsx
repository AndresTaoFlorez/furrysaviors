import { useEffect, useRef } from 'react';

const useInitialWidth = (elementRef, callback) => {
  const initialWidthRef = useRef(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        const currentWidth = entries[0].contentRect.width;

        // Guarda el ancho inicial solo la primera vez
        if (initialWidthRef.current === null) {
          initialWidthRef.current = currentWidth;
          if (callback) {
            callback(currentWidth); // Llama al callback pasando el ancho inicial
          }
        }
      }
    });

    if (elementRef.current) {
      resizeObserver.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        resizeObserver.unobserve(elementRef.current);
      }
    };
  }, [elementRef, callback]);

  return initialWidthRef.current;
};

export default useInitialWidth;
