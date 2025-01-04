import { useRef, useState } from 'react'
import '../../style/reactComponentsStyle/moreComponentsStyle/Option1.scss'
import { useActiveClass } from '../customHooks/useActiveClass'

export function Option1() {
  const content = useRef(null)
  const [config, setConfig] = useState({})

  const { updateActiveClass } = useActiveClass({
    elementRef: content,
    config,
    setConfig,
    events: {
      click: (e) => {
        updateActiveClass({ targetElement: e.target, elementRef: content})
      }
    }
  })

  return (
    <div className="option1">
      <div className="option1_mainTitle">
        <h1> Option1 from navbar options</h1>

        <div className="content" ref={content}>
          <div id='one'>one</div>
          <div>two</div>
          <div>three</div>
          <div>four</div>
          <div>five</div>
        </div>
      </div>
    </div>
  )
}