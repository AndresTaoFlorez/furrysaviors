import { useState } from "react"
import '../../style/reactComponentsStyle/MenuButton.scss'
import ModalTest from './Modal'
import { OptionButton } from "./OptionButton"

export function MenuButton(props) {
  const description = props.description
  const [clickStatus, setClickStatus] = useState(false)
  const [animation, setAnimation] = useState(false)

  const handleClick = () => {
    setClickStatus(!clickStatus)
  }

  const handleModalState = () => {
    setAnimation(true)
    setTimeout(() => {
      // setIsHovered(false)
      handleClick()
      setAnimation(false)
    }, 120)
  }



  return (
    <div className="menuButtonContent">
      {clickStatus ? (
        <ModalTest modalState={clickStatus} setModalState={handleModalState}>
          <div className="menuButtonBlock"></div>
          <div className={`menuOptions ${animation && 'menuOptionsOut'}`}> {/*Contiene el Animation*/}
            <h2>Menu Options</h2>
            <div className="menuOptionsList">
              <div className="optionMenuButton">option 1</div>
              <div className="optionMenuButton">option 2</div>
              <div className="optionMenuButton">option 3</div>
            </div>
          </div>
        </ModalTest>
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