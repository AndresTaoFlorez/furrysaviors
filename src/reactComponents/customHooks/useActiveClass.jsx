import { useEffect, useRef, useState, useCallback, useInsertionEffect } from 'react'
import { isEqual, isEmpty, isNil } from 'lodash';

/**
 * By default the activeIndex child proposal is created and update within the 'state' that was passed as parameter
 * @param {*} elementRef ref element
 * @param {*} state 
 * @param {Function} setState 
 * @param {Array} notChild Array of strings with the classes that should not be considered as children
 * @param {Object} stateAdditionalData Aditional values (object) to agregate to the 'state' that was passed as parameter
 * @returns 
 */
export const useActiveClass = (props) => {
  const {
    elementRef = null,
    state = {},
    setState = () => { },
    notChild = [],
    stateAdditionalData = {}
  } = props;

  const handlersMap = useRef(new Map())
  const mutationDebounceTimeout = useRef(null)

  /**
   * Updates the active class on the clicked child element
   * @param {HTMLElement} clickedChild - The clicked child elementRe
   */
  const updateActiveClass = useCallback((clickedChild) => {
    const element = elementRef.current
    if (!element) return

    const children = Array.from(element.children)
    children.forEach((child) => {
      child.classList.toggle('active', child === clickedChild)
    })

    const clickedIndex = children.indexOf(clickedChild)


    // Update state state
    setState((prevState) => ({
      ...prevState,
      ...stateAdditionalData,
      activeIndex: clickedIndex
    }))
  }, [elementRef])

  /**
   * Updates the active class when state changes
   * @param {HTMLElement} children - The clicked child elementRe
   */
  const initializedClassChild = useCallback((children) => {
    const element = elementRef.current

    if (isNil(element) || isNil(children)) return
    const elements = Array.from(element.children)
    elements.forEach((child) => {
      child.classList.toggle('active', child === children)
    })
  }, [elementRef])

  /**
   * Adds click event listeners to child elements
   */
  const addClickListeners = useCallback(() => {
    const element = elementRef.current
    if (!element) return

    const children = Array.from(element.children)
    children.forEach((child) => {
      if (notChild.some(id => child.id.includes(id))) return
      if (!handlersMap.current.has(child)) {
        const handler = () => updateActiveClass(child)
        child.addEventListener('click', handler)
        handlersMap.current.set(child, handler)
      }
    })

  }, [elementRef])

  /**
   * Removes click event listeners from child elements
   */
  const removeClickListeners = useCallback(() => {
    const element = elementRef.current
    if (!element) return

    const children = Array.from(element.children)
    children.forEach((child) => {
      const handler = handlersMap.current.get(child)
      if (handler) {
        child.removeEventListener('click', handler)
        handlersMap.current.delete(child)
      }
    })
  }, [elementRef])

  /**
   * Observes changes in child elements and initilized when page loads the first time
   */
  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observerCallback = () => {
      clearTimeout(mutationDebounceTimeout.current)
      mutationDebounceTimeout.current = setTimeout(() => {
        removeClickListeners()
        addClickListeners()
      }, 100) // Debounced to limit execution frequency
    }

    const observer = new MutationObserver(observerCallback)
    observer.observe(element, { childList: true, subtree: true })

    addClickListeners()

    return () => {
      observer.disconnect()
      removeClickListeners()
      clearTimeout(mutationDebounceTimeout.current)
    }
  }, [elementRef])

  /**
   * Update the active class when state and stateAdditionalData changes
   */
  useEffect(() => {

    const element = elementRef.current

    if (isNil(element) || isEmpty(state)) return

    const children = Array.from(element.children)
    // console.log('current changed: ', state);

    initializedClassChild(children[state.activeIndex])

  }, [state])

}
