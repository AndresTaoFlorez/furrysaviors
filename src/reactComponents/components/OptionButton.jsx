import { useState } from "react"
import '../../style/reactComponentsStyle/OptionButton.scss'
// importar contexto
export function OptionButton({ id = "", children, onClick = () => { } }) {

  return (
    <div id={id} className='optionButtonComponent'>
      {children}
    </div>
  );
}