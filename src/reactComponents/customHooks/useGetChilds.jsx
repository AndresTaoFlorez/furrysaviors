import { useEffect, useState, useRef } from 'react';
import { isBad } from '../../services.js/dataVerify';

/**
 * Custom hook to get and track the children of a reference element.
 * Allows setting event listeners on children up to a specific depth.
 */
export const useGetChilds = ({ refConfig = {}, notChild = [], events = {} }) => {
  const refElement = refConfig?.elementRef;
  const option = refConfig?.option ?? 1; // Nivel de profundidad, por defecto 1

  const [elementState, setElementState] = useState([]);
  const mutationDebounceTimeout = useRef(null);
  const eventHandlersRef = useRef({});

  const removeActiveElements = () => {
    const element = refElement?.current;
    if (element) {
      Array.from(element.children).forEach(child => {
        if (child.classList.contains('active')) {
          child.classList.remove('active');
          Object.entries(events).forEach(([eventType, callback]) => {
            const eventHandler = eventHandlersRef.current[`${child.id}-${eventType}`];
            if (eventHandler) {
              child.removeEventListener(eventType, eventHandler);
              delete eventHandlersRef.current[`${child.id}-${eventType}`];
            }
          });
        }
      });
    }
  };

  /**
   * Get child elements up to a specific depth.
   * @param {HTMLElement} parent - The parent element.
   * @param {number} depth - The current depth level.
   * @param {Array} notChild - Array of child IDs to exclude.
   * @returns {Array} The list of child elements.
   */
  const getChildrenAtDepth = ({ parent, depth = 1, notChild = [] }) => {
    if (depth === 1) return Array.from(parent.children).filter(child => !notChild.includes(child.id));
    return Array.from(parent.children)
      .filter(child => {
        !notChild.includes(child.id)
      })
      .flatMap(child => getChildrenAtDepth({ parent: child, depth: depth - 1, notChild }));
  };

  useEffect(() => {
    const element = refElement?.current;

    if (!element || !(element instanceof HTMLElement)) {
      console.log('El elemento no es un nodo DOM', element);
      removeActiveElements();
      return;
    }

    /**
     * Get the updated list of child elements, filtered and with event listeners added.
     * @returns {Array} The list of child elements with their metadata.
     */
    const getUpdatedChilds = () => {
      const targetChildren = getChildrenAtDepth({ parent: element, depth: option });
      return targetChildren
        .filter(child => !notChild.includes(child.id)) // Filtrar elementos no deseados
        .map(child => {
          if (events && typeof events === 'object') {
            Object.entries(events).forEach(([eventType, callback]) => {
              if (typeof callback === 'function') {
                // Crear un manejador que detenga la propagación
                const eventHandler = eventHandlersRef.current[`${child.id}-${eventType}`] ?? ((e) => {
                  e.stopPropagation(); // Detener la propagación del evento
                  callback(e);
                });

                child.addEventListener(eventType, eventHandler);
                eventHandlersRef.current[`${child.id}-${eventType}`] = eventHandler;
              }
            });
          }

          return {
            childId: Array.from(child.children).map(c => c.id),
            tagName: child.tagName,
            id: child.id,
            classList: Array.from(child.classList),
            node: child,
          };
        });
    };


    const observerCallback = () => {
      clearTimeout(mutationDebounceTimeout.current);
      mutationDebounceTimeout.current = setTimeout(() => {
        setElementState(getUpdatedChilds);
      }, 100);
    };

    const observer = new MutationObserver(observerCallback);
    observer.observe(element, { childList: true, subtree: true });

    setElementState(() => (isBad(refElement) ? [] : getUpdatedChilds()));

    return () => {
      observer.disconnect();
      clearTimeout(mutationDebounceTimeout.current);
      Array.from(element.children).forEach(child => {
        Object.entries(events).forEach(([eventType, callback]) => {
          const eventHandler = eventHandlersRef.current[`${child.id}-${eventType}`];
          if (eventHandler) {
            child.removeEventListener(eventType, eventHandler);
            delete eventHandlersRef.current[`${child.id}-${eventType}`];
          }
        });
      });
    };
  }, [refElement, option]);

  return { childs: elementState, removeActiveElements, getChildrenAtDepth };
};
