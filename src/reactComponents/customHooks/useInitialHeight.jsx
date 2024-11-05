import { useEffect, useRef } from 'react';

/**
 * @param {React.RefObject} elementRef - Referencia al elemento cuya altura se desea medir.
 * @param {function} callback - Función opcional que se ejecuta con el valor de la altura inicial.
 * @returns {number} - Altura inicial del elemento.
 */
const useInitialHeight = (elementRef, callback) => {
  const initialHeightRef = useRef(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        const currentHeight = entries[0].contentRect.height;

        // Guarda el ancho inicial solo la primera vez
        if (initialHeightRef.current === null) {
          initialHeightRef.current = currentHeight;
          if (callback) {
            callback(currentHeight); // Llama al callback pasando el ancho inicial
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

  return initialHeightRef.current;
};

export default useInitialHeight;
