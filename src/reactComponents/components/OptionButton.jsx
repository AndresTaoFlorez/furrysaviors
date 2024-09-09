import { useState } from "react"
import '../../style/reactComponentsStyle/OptionButton.scss'
// importar contexto
export function OptionButton(props, onClick = () => { }) {
  const [isHovered, setIsHovered] = useState(false)

  const onMouseHoverOut = (callback, delay) => {
    // console.log('onMouseDelay');

    setTimeout(callback, delay);
  };

  return (
    <div className={`${isHovered ? 'growingOptionButton' : 'defaultButton'} buttonOptionComponent`}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => onMouseHoverOut(setIsHovered(false), 20)}>
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

