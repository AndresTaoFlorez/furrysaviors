import { useState } from "react"
import '../../style/reactComponentsStyle/FloatingButton.scss'

export function FloatingButton(props) {
  const description = props.description
  const [isHovered, setIsHovered] = useState(false)

  const onMouseHoverOut = async () => {
    setTimeout(() => {
      setIsHovered(false)
    }, 20)
  }

  return (
    <div className={`${isHovered ? 'growingFloatingButton' : 'defaultButton'} floatingButton`}
      onMouseOver={async () => setIsHovered(true) }
      onMouseOut={onMouseHoverOut}>
      <div className='button'>
        {description}
      </div>
    </div>
  )
}

