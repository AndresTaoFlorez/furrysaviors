import { useState } from "react"
import '../../style/reactComponentsStyle/OptionButton.scss'
// importar contexto
export function OptionButton(props) {
  const [isHovered, setIsHovered] = useState(false)

  const onMouseHoverOut = async () => {
    setTimeout(() => {
      setIsHovered(false)
    }, 20)
  }

  return (
    <div className={`${isHovered ? 'growingOptionButton' : 'defaultButton'} buttonOptionComponent`}
      onMouseOver={async () => setIsHovered(true)}
      onMouseOut={onMouseHoverOut}>
      <div className='button'>
        {props.description}
      </div>
    </div>
  )
}

// setGeneralWidth({
//   navOptionsRef: navOptionsRef_width,
//   floatingButtonRef: floatingButtonRef_width,
//   headerContentRef: headerContentRef_width,
//   broke
// });

