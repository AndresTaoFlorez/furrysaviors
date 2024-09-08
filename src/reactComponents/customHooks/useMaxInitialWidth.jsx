import { useEffect, useRef } from 'react';

const useMaxInitialWidth = (elementRef, callback) => {
  const initialWidthRef = useRef(null); // Para almacenar el ancho inicial
  const maxWidthRef = useRef(0); // Para almacenar el valor más alto del ancho

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        const currentWidth = entries[0].contentRect.width; // Obtiene el ancho actual

        // Guarda el ancho inicial solo la primera vez
        if (initialWidthRef.current === null) {
          initialWidthRef.current = currentWidth;
        }

        // Actualiza el valor máximo si el ancho actual es mayor
        if (currentWidth > maxWidthRef.current) {
          maxWidthRef.current = currentWidth;
          if (callback) {
            callback(maxWidthRef.current); // Llama al callback con el ancho más grande
          }
        }
      }
    });

    if (elementRef.current) {
      resizeObserver.observe(elementRef.current); // Observa el elemento
    }

    return () => {
      if (elementRef.current) {
        resizeObserver.unobserve(elementRef.current); // Limpia al desmontar
      }
    };
  }, [elementRef, callback]);

  return maxWidthRef.current; // Devuelve el valor más alto
};

export default useMaxInitialWidth;
