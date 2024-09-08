import '../../style/reactComponentsStyle/SearchButton.scss'
import { OptionButton } from "./OptionButton"
import Modal, { ModalTest } from './Modal'
import { useState, useRef, useEffect } from 'react'
import useInitialHeight from '../customHooks/useInitialHeight'
import useInitialWidth from '../customHooks/useInitialWidth'
import useMaxInitialWidth from '../customHooks/useMaxInitialWidth'
// importar contexto

export function SearchButton(props) {
  const [clickStatus, setClickStatus] = useState({ state: true, focused: false })
  const [initialSize, setInitialSize] = useState({})
  const searchButtonRef = useRef(null)
  const searchButtonIconRef = useRef(null)

  const [animation, setAnimation] = useState(false)

  useInitialHeight(searchButtonIconRef, (height) => { setInitialSize(prev => ({ ...prev, searchButtonIconHeight: height })) })
  useMaxInitialWidth(searchButtonIconRef, (width) => { setInitialSize(prev => ({ ...prev, searchButtonIconWidth: width })) })
  useInitialHeight(searchButtonRef, (height) => { setInitialSize(prev => ({ ...prev, searchButtonHeight: height })) })
  useInitialWidth(searchButtonRef, (width) => { setInitialSize(prev => ({ ...prev, searchButtonWidth: width })) })

  return (
    <div className='searchButton'
      style={{
        '--searchButtonIconHeight': initialSize.searchButtonIconHeight + 'px',
        '--searchButtonIconWidth': initialSize.searchButtonIconWidth + 'px'
      }}
      ref={searchButtonRef}
      onClick={() => {
        if (!clickStatus.focused) {
          setClickStatus(e => ({ ...e, state: !clickStatus.state }))
        }
      }}>
      {clickStatus.state ?
        <div className='searchButtonIcon' ref={searchButtonIconRef}

        >
          <OptionButton description={props.description}></OptionButton>
        </div>
        : ( // SEARCH BAR INPUT TO WRITE
          <Modal setState={setClickStatus} state={clickStatus} setPreState={setAnimation}>
            <div className={`${!animation ? `searchButtonOpened` : `searchButtonOut`} searchButtonBar`}
              style={{ '--searchInputHeight': initialSize.searchButtonHeight + 'px', '--searchInputWidth': initialSize.searchButtonWidth + 'px', '--animationDuration': '100ms' }}>
              <input type="text" className="searchInput"
                onClick={() => { setClickStatus(e => ({ ...e, focused: true })) }}
                onMouseOver={() => { setClickStatus(e => ({ ...e, focused: true })) }}
                onMouseOut={() => { setClickStatus(e => ({ ...e, focused: false })) }} />
            </div>
          </Modal>
        )
      }
    </div>
  )
}