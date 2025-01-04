import { indexOf, set, update } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useGetChilds } from './useGetChilds';
import { isBad, isFunction } from '../../services.js/dataVerify';


/**
 * Custom hook to manage the active class for children of a reference element.
 * It allows you to set the "active" class on a child element and remove it from others.
 * The hook also handles click events to update the active class dynamically.
 * 
 * @param {import('react').RefObject} prop.elementRef - The reference to the parent element whose children will have the active class updated.
 * @param {object} prop.config - The configuration object that includes the active index.
 * @param {function} prop.setConfig - Function to update configuration.
 * @param {Array} prop.notChild - List of children to exclude from being considered.
 * @param {object} prop.events - Event listeners to add to the children.
 * @param {number} prop.depth - The depth level to consider when getting the children.
 * @param {object|null} prop.additionalConfig - Additional configuration for custom behavior.
 * 
 * @return {Function} updateActiveClass - Function to update the active class on a child element.
 */
export const useActiveClass = ({
  elementRef = {},
  config = {},
  setConfig = () => { },
  notChild = [],
  events = {},
  depth = 1,
  additionalConfig = null,
}) => {

  const [childIndex, setChildIndex] = useState(config?.activeIndex)

  /**
   * get total childs from elementRef.current and update active class
   * when click on child
   */
  const { childs, removeActiveElements, getChildrenAtDepth } = useGetChilds({
    refConfig: { elementRef, option: depth },
    notChild,
    events
  });

  /**
   * This function updates the "active" class on a single child of `elementRef.current`.
   * 
   * @param {HTMLElement} targetElement - The element to which the "active" class will be added.
   * @param {import('react').RefObject} elementRef - The reference to the container whose children will be updated.
   * @param {Array} notChild - List of child elements to exclude from being considered.
   * @param {boolean} withoutState - A flag to determine whether to update the state or not.
   */
  const updateActiveClass = ({ targetElement = {}, elementRef = {}, withoutState = true }) => {
    if (isBad(elementRef?.current)) return;
    if (!targetElement || !targetElement.nodeType) return; // Validación del targetElement

    const childrens = getChildrenAtDepth({ parent: elementRef.current, depth, notChild });

    Array.from(childrens)
      .filter(child => !notChild.includes(child.id))
      .forEach((child) => {
        if (child === targetElement) {
          child.classList.add('active');
        } else {
          child.classList.remove('active');
        }
      });

    const currentIndex = Array.from(childrens).findIndex(child => child === targetElement)
    withoutState && setChildIndex(currentIndex)

  };
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

  useEffect(() => {

    if (!isFunction(setConfig)) {
      removeActiveElements()
      return
    }

  }, [childs, childIndex])


  // update child active class from server data about activeindex
  useEffect(() => {
    if (isBad(config, elementRef.current)) return

    const childrens = getChildrenAtDepth({ parent: elementRef.current, depth, notChild });
    const targetElement = childrens[config.activeIndex];
    updateActiveClass({ targetElement, elementRef, notChild, withoutState: false });
  }, [elementRef, config])

  return isFunction(setConfig) && { updateActiveClass };
};
