import { useState } from "react"
import '../../style/reactComponentsStyle/MenuButton.scss'
import { ModalTest } from './Modal'

export function MenuButton(props) {
  const description = props.description
  const [isHovered, setIsHovered] = useState(false)
  const [clickStatus, setClickStatus] = useState(false)

  const onMouseHoverOut = async () => {
    setTimeout(() => {
      setIsHovered(false)
    }, 20)
  }

  const handleClick = () => {
    setClickStatus(!clickStatus)
  }

  return (
    <ModalTest modalState={clickStatus} setModalState={handleClick}>
      <div className={`${isHovered ? 'growingMenuButton' : 'defaultButton'} menuButton`}
        onClick={handleClick}
        onMouseOver={async () => setIsHovered(true)}
        onMouseOut={onMouseHoverOut}>
        <div className='button'>
          {description}
        </div>
      </div>
    </ModalTest>
  )
}

