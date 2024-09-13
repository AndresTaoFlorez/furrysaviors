import { useEffect } from 'react';
import '../../style/reactComponentsStyle/Modal.scss'

function Modal({ children, setState = '', state = '', setPreState = () => {}, duration=200 }) {

  const onMouseDelay = async (callback, duration = 1000) => {
    // console.log('onMouseDelay');
    setTimeout(callback, duration);
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
            }, duration)
          }}
        ></div>
        {children}
      </div>
    </>)
}

export function ModalTest({ children, setModalState = () => {}, modalState, duration=200 }) {
  console.log(duration);
  
  const delay = async (callback, delay) => {
    setTimeout(callback, delay);
  };
  return (<>
    <div className='modalComponent'>
      <div className={`${modalState ? "modalBackground" : "modalBackgroundOut"}`}
        onClick={() => {
          setModalState(false)
          delay(() => {
            setModalState(true)
          }, Number(duration))
        }}
      >
      </div>
      {children}
    </div>
  </>)
}


export default Modal;