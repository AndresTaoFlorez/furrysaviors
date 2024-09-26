import { useEffect, useState } from 'react';
import '../../style/reactComponentsStyle/Modal.scss'

export function ModalTest({ children, setModalState = () => { }, modalState, duration = 200 }) {

  const delay = async (callback, delay) => {
    setTimeout(callback, delay);
  };

  const handleModal = () => {
    setModalState(false)
    delay(() => {
      setModalState(true)
    }, Number(duration))
  }

  const handleKeyModal = (e) => {
    if (e.key == 'Escape' && modalState === true) {
      handleModal()
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
      <div className={`${modalState ? "modalBackground" : "modalBackgroundOut"}`}
        onClick={handleModal}
      >
      </div>
      <div className='children' onKeyDown={handleKeyModal}>
        {children}
      </div>
    </div>
  </>)
}
