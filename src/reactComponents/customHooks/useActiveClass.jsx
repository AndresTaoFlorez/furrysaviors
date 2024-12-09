import { useContext, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import { update } from '../../services.js/updateConfig';

export const useActiveClass = (elementRef) => {
  const { config, setConfig } = useContext(GlobalContext);
  const location = useLocation();
  const handlersMap = useRef(new Map());
  const mutationDebounceTimeout = useRef(null);

  /**
   * Updates the active class on the clicked child element
   * @param {HTMLElement} clickedChild - The clicked child elementRe
   */
  const updateActiveClass = useCallback((clickedChild) => {
    const element = elementRef.current;
    if (!element) return;

    const children = Array.from(element.children);
    children.forEach((child) => {
      child.classList.toggle('active', child === clickedChild);
    });

    const clickedIndex = children.indexOf(clickedChild);

    // Update config state

    console.log('config: ' + config);
    setConfig((prevConfig) => ({
      ...prevConfig,
      activeIndex: clickedIndex,
    }));
  }, [elementRef, setConfig]);

  /**
   * Adds click event listeners to child elements
   */
  const addClickListeners = useCallback(() => {
    const element = elementRef.current;
    if (!element) return;

    const children = Array.from(element.children);
    children.forEach((child) => {
      if (child.getAttribute('class') === 'searchButton') return;
      if (!handlersMap.current.has(child)) {
        const handler = () => updateActiveClass(child);
        child.addEventListener('click', handler);
        handlersMap.current.set(child, handler);
      }
    });
  }, [elementRef, updateActiveClass]);

  /**
   * Removes click event listeners from child elements
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
   * Observes changes in child elements
   */
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observerCallback = () => {
      clearTimeout(mutationDebounceTimeout.current);
      mutationDebounceTimeout.current = setTimeout(() => {
        removeClickListeners();
        addClickListeners();
      }, 100); // Debounced to limit execution frequency
    };

    const observer = new MutationObserver(observerCallback);
    observer.observe(element, { childList: true, subtree: true });

    addClickListeners();
    
    const activeIndex = config.activeIndex
    // actualizar el 
    console.log(activeIndex)

    return () => {
      observer.disconnect();
      removeClickListeners();
      clearTimeout(mutationDebounceTimeout.current);
    };
  }, [elementRef]);

  /**
   * Updates the current URL in the config state on route change
   */
  useEffect(() => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      currentUrl: location.pathname,
    }));
    
  }, [location.pathname, setConfig]);

  /**
   * useEffect para obtener el activeIndex después de que se actualice config
   */
  useEffect(() => {
    const activeIndex = config?.activeIndex;
    console.log("Active Index:", activeIndex); // Aquí obtienes el valor actualizado

    const element = elementRef.current;
    if (element) {
      const children = Array.from(element.children);
      const targetChild = children[activeIndex]; // Obtén el hijo correspondiente al activeIndex
      if (targetChild) {
        updateActiveClass(targetChild); // Llama a updateActiveClass con el hijo correspondiente
      }
    }
  }, [config?.activeIndex, elementRef, updateActiveClass]); // Se ejecuta cada vez que activeIndex cambia

  return null;
};
