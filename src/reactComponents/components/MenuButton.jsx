import { useState } from "react"
import '../../style/reactComponentsStyle/MenuButton.scss'
import { Modal } from './Modal'
import { OptionButton } from "./OptionButton"

export function MenuButton({ description }) {
  const [toggleLogin, setToggleLogin] = useState({
    animation: false,
    clickStatus: false
  })

  const handleClick = () => {
    setToggleLogin({
      animation: true,
      clickStatus: true
    })
  }

  const handleModalState = () => {
    setAnimation(true)
    setTimeout(() => {
      handleClick()
      setAnimation(false)
    }, 120)
  }


  return (
    <div className="menuButtonContent">
      {toggleLogin.clickStatus ? (
        <Modal setToggleLogin={setToggleLogin} toggleLogin={toggleLogin}>
          <div className="menuButtonBlock"></div>
          <div className={`menuOptions ${!toggleLogin.animation && 'menuOptionsOut'}`}> {/*Contiene el Animation*/}
            <h2>Menu Options</h2>
            <div className="menuOptionsList">
              <div className="optionMenuButton">option 1</div>
              <div className="optionMenuButton">option 2</div>
              <div className="optionMenuButton">option 3</div>
            </div>
          </div>
        </Modal>
      ) : (<>
        <div className='menuButton'
          onClick={handleClick}>
          <div className='button'>
            {description}
          </div>
        </div>
      </>
      )}
    </div>
  )
}