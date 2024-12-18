import { get, indexOf, set, update } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useGetChilds } from './useGetChilds';
import { isBad } from '../../services.js/dataVerify';


/**
 * Custom hook to manage the active class for children of a reference element.
 * It allows you to set the "active" class on a child element and remove it from others.
 * The hook also handles click events to update the active class dynamically.
 * 
 * @param {object} params - Configuration parameters.
 * @param {import('react').RefObject} params.elementRef - The reference to the parent element whose children will have the active class updated.
 * @param {Array} params.notChild - List of children to exclude from being considered.
 * @param {function} params.setConfig - Function to update configuration.
 * @param {object|null} params.additionalConfig - Additional configuration for custom behavior.
 */
export const useActiveClass = ({
  elementRef = { current: null },
  config = {},
  setConfig = () => { },
  notChild = [],
  additionalConfig = null,
}) => {

  const [childIndex, setChildIndex] = useState(-1)

  /**
   * get total childs from elementRef.current and update active class
   * when click on child
   */
  const { removeActiveElements, elementState } = useGetChilds({
    refElement: elementRef,
    notChild,
    events: {
      click: (e) => { (isBad(config, { secondLevel: true })) ? {} : handleActiveClass(e.target.parentElement, elementRef) }
    }
  });

  useEffect(() => {
    console.log(config);
  }, [config])

  /**
   * This function updates the "active" class on a single child of `elementRef.current`.
   * 
   * @param {HTMLElement} targetElement - The element to which the "active" class will be added.
   * @param {import('react').RefObject} elementRef - The reference to the container whose children will be updated.
   */
  const handleActiveClass = useCallback((targetElement, elementRef, withoutState = true) => {
    if (isBad(elementRef?.current)) return
    Array.from(elementRef?.current.children).forEach((child) => {
      child?.classList.remove('active');
    });
    targetElement?.classList.add('active');
    const currentIndex = indexOf(elementRef?.current.children, targetElement);
    if (withoutState) { setChildIndex(currentIndex) }
  }, [config])

  /**
   * 
   * @param {*} index 
   */
  const handleStateConfig = (index) => {
    setConfig(() => {
      return isBad(additionalConfig, { secondLevel: true })
        ? { activeIndex: index }
        : { activeIndex: index, ...additionalConfig };
    });
  };

  // Remove the "active" class from all children when the component is unmounted or when the `notChild` list changes.
  useEffect(() => {
    // if (isBad(config)) { removeActiveClass(elementRef) }
    if (isBad(config)) {
      removeActiveElements()
      setChildIndex(-1)
    }
  }, [elementState, config, elementRef, childIndex])

  // Update the state using the handleStateConfig function whenever additionalConfig or childIndex changes.
  useEffect(() => {
    handleStateConfig(childIndex)
  }, [additionalConfig, childIndex])

  // update child active class from server data about activeindex
  useEffect(() => {
    if (isBad(config, elementRef.current)) return
    const targetElement = elementRef.current.children[config.activeIndex];
    handleActiveClass(targetElement, elementRef, false);
  }, [elementRef, config])
};
