import { useCallback, useEffect } from 'react';
import '../../style/reactComponentsStyle/Modal.scss'

/**
 * @param {function} setModalState - Función para manejar el estado de clic.
 * @param {boolean} modalState - Estado de clic.
 */
const ModalTest = ({ children, setModalState = () => { }, modalState }) => {

  const handleModal = () => {
    setModalState(false);
  }

  const handleKeyModal = (e) => {
    if (e.key === 'Escape' && modalState) {
      handleModal();
    }
  }

  useEffect(() => {
    if (modalState) {
      document.addEventListener('keydown', handleKeyModal);
    }
    // Cleanup para remover el listener cuando el componente se desmonta o el modal se cierra
    return () => {
      document.removeEventListener('keydown', handleKeyModal);
    };
  }, [modalState]); // El listener se activará solo si modalState es true


  return (<>
    <div className='modalComponent'>
      <div
        className={`modalBackground ${modalState ? "modalBackground--active" : "modalBackground--inactive"}`}
        onClick={handleModal}
      />
      <div className={`children ${modalState ? "children--active" : "children--inactive"}`}>
        {children}
      </div>
    </div>
  </>
  )
}

/**
 * @param {function} setToggleLogin - Función para manejar el estado de clic.
 * @param {Object} toggleLogin - Estado de clic.
 * @throws {Error} - Si no se proporciona una función setToggleLogin o un objeto toggleLogin.
 */
export const ModalContext = ({ children, setToggleLogin, toggleLogin }) => {
  const handleModal = () => {
    setToggleLogin(prev => ({ ...prev, animation: false }));
    setTimeout(() => {
      setToggleLogin(prev => ({ ...prev, clickStatus: false }));
    }, 200);
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


export default ModalTest