import { useState } from "react"
import '../../style/reactComponentsStyle/OptionButton.scss'
// importar contexto
export function OptionButton({ id = "", description }) {

  return (
    <div id={id} className='buttonOptionComponent'>
      <div className='button'>
        {description}
      </div>
    </div>
  )
}