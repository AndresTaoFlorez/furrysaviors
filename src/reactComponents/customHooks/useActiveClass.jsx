import { useLocation } from 'react-router-dom';
import { useContext, useEffect, useRef, useCallback } from 'react';
import { GlobalContext } from '../context/GlobalContext';

export const useActiveClass = (elementRef) => {
  const location = useLocation();
  const { setConfig } = useContext(GlobalContext);
  const handlersMap = useRef(new Map());
  const mutationDebounceTimeout = useRef(null);

  /**
   * 🔥 Actualiza la clase activa en el elemento hijo clickeado
   */
  const updateActiveClass = useCallback((clickedChild) => {
    const element = elementRef.current;
    if (!element) return;

    const children = Array.from(element.children);
    children.forEach((child) => {
      child.classList.toggle('active', child === clickedChild);
    });

    const clickedIndex = children.indexOf(clickedChild);
    setConfig((prevConfig) => ({
      ...prevConfig,
      activeIndex: clickedIndex,
      currentUrl: location.pathname, // URL actual de la página
    }));
  }, [elementRef, setConfig, location.pathname]);

  /**
   * 📡 Agrega los listeners de clic a los hijos del elemento
   */
  const addClickListeners = useCallback(() => {
    const element = elementRef.current;
    if (!element) return;

    const children = Array.from(element.children);
    children.forEach((child) => {
      if (child.getAttribute('class') === 'searchButton') return
      if (!handlersMap.current.has(child)) {
        const handler = () => updateActiveClass(child);
        child.addEventListener('click', handler);
        handlersMap.current.set(child, handler);
      }
    });
  }, [elementRef, updateActiveClass]);

  /**
   * 🗑️ Elimina los listeners de clic de los hijos del elemento
   */
  const removeClickListeners = useCallback(() => {
    const element = elementRef.current;
    if (!element) return;

    const children = Array.from(element.children);
    children.forEach((child) => {
      const handler = handlersMap.current.get(child);
      if (handler) {
        child.removeEventListener('click', handler);
        handlersMap.current.delete(child);
      }
    });
  }, [elementRef]);

  /**
   * 🛠️ Observa cambios en los hijos del elemento
   */
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // El MutationObserver observará cambios en los hijos del elemento
    const observerCallback = () => {
      clearTimeout(mutationDebounceTimeout.current);
      mutationDebounceTimeout.current = setTimeout(() => {
        // Primero eliminamos los listeners antiguos
        removeClickListeners();
        // Luego agregamos los nuevos listeners si hay nuevos hijos
        addClickListeners();
      }, 100); // Ajustamos el debounce para que no se ejecute en exceso
    };

    const observer = new MutationObserver(observerCallback);
    observer.observe(element, { childList: true, subtree: true });

    // Aseguramos que los listeners iniciales se agreguen
    addClickListeners();

    // Cleanup cuando el componente se desmonte
    return () => {
      observer.disconnect();
      removeClickListeners();
      clearTimeout(mutationDebounceTimeout.current);
    };
  }, [elementRef, addClickListeners, removeClickListeners]);

  return null;
};
