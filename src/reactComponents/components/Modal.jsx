import { useCallback, useEffect } from 'react';
import '../../style/reactComponentsStyle/Modal.scss'

/**
 * Modal component that manages a toggleable login modal with animations.
 * 
 * @param {Object} param - The props for the component.
 * 
 * @param {Object} param.toggleLogin - The state object that controls the modal's behavior.
 * @param {boolean} param.toggleLogin.animation - Controls the animation status of the modal (true = active, false = inactive).
 * @param {boolean} param.toggleLogin.clickStatus - Indicates if the modal is currently "clicked" or active.
 * 
 * @param {function} param.setToggleLogin - Function to update the `toggleLogin` state. It must update the `animation` and `clickStatus` properties.
 * 
 * @param {Number} [param.duration=200] - Optional. The timeout (in milliseconds) for the modal toggle animation.
 * 
 * @param {React.ReactNode} param.children - The child components to be displayed inside the modal.
 * 
 * @throws {Error} - If `setToggleLogin` is not a function or if `toggleLogin` is not an object with the required properties.
 */
export const Modal = ({ children, setToggleLogin, toggleLogin, duration = 200 }) => {
  const handleModal = () => {
    setToggleLogin(prev => ({ ...prev, animation: false }));
    setTimeout(() => {
      setToggleLogin(prev => ({ ...prev, clickStatus: false }));
    }, duration);
  };

  const handleKeyModal = useCallback((e) => {
    if (e.key === 'Escape' && toggleLogin.animation) {
      handleModal();
    }
  }, [toggleLogin.animation]);

  useEffect(() => {
    if (toggleLogin.animation) {
      document.addEventListener('keydown', handleKeyModal);
      return () => document.removeEventListener('keydown', handleKeyModal);
    }
  }, [toggleLogin.animation, handleKeyModal]);

  return (
    <div className='modalComponent'>
      <div
        className={`modalBackground ${toggleLogin.animation ? "modalBackground--active" : "modalBackground--inactive"}`}
        onClick={handleModal}
      />
      <div className="children children--active">
        {children}
      </div>
    </div>
  );
};