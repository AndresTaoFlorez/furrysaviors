import { useCallback, useEffect } from 'react';
import '../../style/reactComponentsStyle/Modal.scss'

/**
 * @param {function} setModalState - Función para manejar el estado de clic.
 * @param {boolean} modalState - Estado de clic.
 */


/**
 * @param {function} setToggleLogin - Función para manejar el estado de clic.
 * @param {Object} toggleLogin - Estado de clic.
 * @throws {Error} - Si no se proporciona una función setToggleLogin o un objeto toggleLogin.
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