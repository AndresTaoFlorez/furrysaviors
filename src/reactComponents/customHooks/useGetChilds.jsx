import { useEffect, useState, useRef } from 'react';
import { isBad } from '../../services.js/dataVerify';

/**
 * Custom hook to get and track the children of a reference element.
 * 
 * This hook returns an array of child elements that updates automatically
 * whenever the child elements of the referenced element change. It also allows
 * for the exclusion of certain child elements and the addition of event listeners.
 * 
 * @param {Object} options - The options to customize the hook.
 * @param {import('react').RefObject} options.refElement - The reference to the parent element whose children will be tracked.
 * @param {Array} [options.notChild=[]] - An array of child element IDs to exclude from the result.
 * @param {Object} [options.events={}] - An object where keys are event names (e.g., 'click') and values are event handlers (functions).
 * 
 * @returns {Array} An array of child elements.
 */
export const useGetChilds = ({ refElement = null, notChild = [], events = {} }) => {
  const [elementState, setElementState] = useState([]);
  const mutationDebounceTimeout = useRef(null);

  useEffect(() => {
    const element = refElement?.current;

    if (!element || !(element instanceof HTMLElement)) {
      console.log('El elemento no es un nodo DOM', element);
      return;
    }

    /**
     * Get the list of child elements, excluding the ones in notChild and assigning event listeners if provided.
     * @returns {Array} List of child elements.
     */
    const getUpdatedChilds = () => {
      return Array.from(element.children)
        .filter(child => !notChild.includes(child.id)) // Excluir hijos
        .map((child) => {
          // Asignar eventos si existen
          if (events && typeof events === 'object') {
            Object.entries(events).forEach(([eventType, callback]) => {
              if (typeof callback === 'function') {
                child.addEventListener(eventType, callback);
              }
            });
          }

          return {
            childId: Array.from(child.children).map(c => c.id),
            tagName: child.tagName,
            id: child.id,
            classList: Array.from(child.classList),
            node: child
          };
        });
    };

    /**
     * Callback that triggers when a mutation is detected.
     * It debounces updates to avoid calling `setElementState` too frequently.
     */
    const observerCallback = () => {
      clearTimeout(mutationDebounceTimeout.current);
      mutationDebounceTimeout.current = setTimeout(() => {
        setElementState(getUpdatedChilds);
      }, 100);
    };

    // Observer para escuchar los cambios en los hijos del elemento
    const observer = new MutationObserver(observerCallback);
    observer.observe(element, { childList: true, subtree: true });

    // Estado inicial
    setElementState(() => {
      if (isBad(refElement)) return [];
      return getUpdatedChilds();
    });

    return () => {
      observer.disconnect();
      clearTimeout(mutationDebounceTimeout.current);
      // Remover los eventos de los elementos hijos
      Array.from(element.children).forEach(child => {
        if (events && typeof events === 'object') {
          Object.entries(events).forEach(([eventType, callback]) => {
            if (typeof callback === 'function') {
              child.removeEventListener(eventType, callback);
            }
          });
        }
      });
    };
  }, [refElement]);

  return elementState;
};
