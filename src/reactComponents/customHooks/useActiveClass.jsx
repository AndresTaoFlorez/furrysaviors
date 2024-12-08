import { useEffect, useContext, useRef } from 'react'
import { GlobalContext } from '../context/GlobalContext'

const useActiveClass = (elementRef) => {
  const { config, setConfig, userSession } = useContext(GlobalContext)
  const handlersMap = useRef(new Map()) // Map para evitar duplicados de eventos
  const mutationDebounceTimeout = useRef(null) // Controla la espera de mutaciones

  const updateActiveClass = (index) => {
    const element = elementRef.current;
    if (!element) return;
  
    const children = element.children;
  
    Array.from(children).forEach((child, i) => {
      if (child.classList.contains('searchButton')) return;
  
      const isActive = i === index;
      if (child.classList.contains('active') !== isActive) {
        child.classList.toggle('active', isActive);
      }
  
      const newId = isActive ? `active-child-${index}` : `child-${i}`;
      if (child.id !== newId) {
        child.id = newId;
      }
    });
  
    // Actualizamos el estado global solo si el índice ha cambiado
    setConfig((prevConfig) => ({
      ...prevConfig,
      activeIndex: index,
      currentUrl: window.location.pathname,
    }));
  };
  
  

  const addClickListeners = () => {
    const element = elementRef.current
    if (!element) return

    const children = Array.from(element.children);
    children.forEach((child, index) => {
      if (child.classList.contains('searchButton')) return;
      if (!handlersMap.current.has(child)) {
        const clickHandler = () => updateActiveClass(index);
        handlersMap.current.set(child, clickHandler);
        child.addEventListener('click', clickHandler);
      }
    });
  };

  const removeClickListeners = () => {
    handlersMap.current.forEach((clickHandler, child) => {
      child.removeEventListener('click', clickHandler);
    });
    handlersMap.current.clear();
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observerCallback = () => {
      clearTimeout(mutationDebounceTimeout.current);
      mutationDebounceTimeout.current = setTimeout(() => {
        removeClickListeners()
        addClickListeners()
      }, 100)
    }

    const observer = new MutationObserver(observerCallback)
    observer.observe(element, { childList: true })

    if (element.children.length > 1) {
      addClickListeners()
      updateActiveClass(config.activeIndex)
      console.log(element.children.length)
    }

    return () => {
      observer.disconnect()
      removeClickListeners()
      clearTimeout(mutationDebounceTimeout.current)
    }

  }, [elementRef])

  useEffect(() => {
    console.log(`token changin , index ${config.activeIndex}`);
    updateActiveClass(config.activeIndex)
  }, [config.activeIndex, userSession.token])

  return config.activeIndex
}

export default useActiveClass
