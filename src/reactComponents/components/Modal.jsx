import { useEffect } from 'react';
import '../../style/reactComponentsStyle/Modal.scss'

function Modal({ children, setState = '', state = '', setPreState = () => { } }) {

  const onMouseDelay = async (callback, delay = 1000) => {
    console.log('onMouseDelay');
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
            { console.log('asas') }
            setPreState(true)
            onMouseDelay(() => {
              setState((prev) => ({ ...prev, state: true, focused: false }))
              setPreState(false)
            }, 20)
          }}
        ></div>
        {children}
      </div>
    </>)
}

export function ModalTest({ children, setModalState = () => { }, modalState }) {

  const delay = async (callback, delay = 1000) => {
    console.log('onMouseDelay');
    setTimeout(callback, delay);
  };

  useEffect(() => {
    console.log('The modal is Active');

  }, [])

  return (<>
    <div className='modalComponent'>
      {/* Pendiente si se debe quitar el modalBackground con el state de este spoce */}

      <div className={`${modalState ? "modalBackground" : "modalBackgroundOut"}`}
        onClick={() => {
          setModalState(false)
          console.log('The modal is Inactive');
          delay(() => {
            setModalState(true)
          }, 300)
        }}
      >
      </div>
      {children}
    </div>
  </>)
}


export default Modal;