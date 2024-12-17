import { useCallback, useEffect } from 'react';
import '../../style/reactComponentsStyle/Modal.scss'

/**
 * @param {function} param.setToggleLogin - Función para manejar el estado de clic.
 * @param {Object} param.toggleLogin - Estado de clic.
 * @param {Number} param.duration  - optional - timeour of togglelogin-bvg
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