import { indexOf, set, update } from 'lodash';
import { useEffect, useRef, useState } from 'react';
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

  const [childIndex, setChildIndex] = useState(config?.activeIndex)

  /**
   * get total childs from elementRef.current and update active class
   * when click on child
   */
  useGetChilds({
    refElement: elementRef,
    notChild,
    events: {
      click: (e) => { updateActiveClass(e.target.parentElement, elementRef) }
    }
  });

  /**
   * This function updates the "active" class on a single child of `elementRef.current`.
   * 
   * @param {HTMLElement} targetElement - The element to which the "active" class will be added.
   * @param {import('react').RefObject} elementRef - The reference to the container whose children will be updated.
   */
  const updateActiveClass = (targetElement, elementRef, withoutState = true) => {
    if (isBad(elementRef?.current)) return
    Array.from(elementRef?.current.children).forEach((child) => {
      child?.classList.remove('active');
    });
    targetElement?.classList.add('active');
    const currentIndex = indexOf(elementRef?.current.children, targetElement);
    if (withoutState) { setChildIndex(currentIndex) }
  }

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

  // Update the state using the handleStateConfig function whenever additionalConfig or childIndex changes.
  useEffect(() => {
    handleStateConfig(childIndex)
  }, [additionalConfig, childIndex])

  // update child active class from server data about activeindex
  useEffect(() => {
    if (isBad(config, elementRef.current)) return
    const targetElement = elementRef.current.children[config.activeIndex];
    updateActiveClass(targetElement, elementRef, false);
  }, [elementRef, config])
};
