import { useCallback, useEffect, useState } from 'react';
import '../../style/reactComponentsStyle/Modal.scss'

/**
 * @param {function} setModalState - Función para manejar el estado de clic.
 * @param {boolean} modalState - Estado de clic.
 * @param {number} duration - Duración de la animación.
 */
const ModalTest = ({ children, setModalState = () => { }, modalState, duration = 200 }) => {

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

export const ModalContext = ({ children, setModalState = () => { }, modalState, duration = 200 }) => {

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


export default ModalTest