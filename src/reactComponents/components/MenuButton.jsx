import { useState } from "react"
import '../../style/reactComponentsStyle/MenuButton.scss'

export function MenuButton(props) {
  const description = props.description
  const [isHovered, setIsHovered] = useState(false)

  const onMouseHoverOut = async () => {
    setTimeout(() => {
      setIsHovered(false)
    }, 20)
  }

  return (
    <div className={`${isHovered ? 'growingMenuButton' : 'defaultButton'} menuButton`}
      onMouseOver={async () => setIsHovered(true) }
      onMouseOut={onMouseHoverOut}>
      <div className='button'>
        {description}
      </div>
    </div>
  )
}

