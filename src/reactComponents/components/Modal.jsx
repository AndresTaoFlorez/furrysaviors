import { useEffect } from 'react';
import '../../style/reactComponentsStyle/Modal.scss'

function Modal({ children, setState = '', state = '', setPreState = () => { } }) {

  const onMouseDelay = async (callback, delay = 1000) => {
    // console.log('onMouseDelay');
    setTimeout(callback, delay);
  };

  return (
    <>
      <div className="modalComponent"
        onMouseOver={() => { setState((prev) => ({ ...prev, focused: true })) }}
      >
        <div className="modalBackground"
          // onClick={() => {
          //   setState((prev) => ({ ...prev, state: true, focused: false }))
          // }}
          onClick={() => {
            setPreState(true)
            onMouseDelay(() => {
              setState((prev) => ({ ...prev, state: true, focused: false }))
              setPreState(false)
            }, 200)
          }}
        ></div>
        {children}
      </div>
    </>)
}

export function ModalTest({ children, setModalState = () => { }, modalState, modalDuration }) {

  const delay = async (callback, delay = 1000) => {
    setTimeout(callback, delay);
  };
  return (<>
    <div className='modalComponent'>
      <div className={`${modalState ? "modalBackground" : "modalBackgroundOut"}`}
        onClick={() => {
          setModalState(false)
          delay(() => {
            setModalState(true)
          }, 2000)
        }}
      >
      </div>
      {children}
    </div>
  </>)
}


export default Modal;