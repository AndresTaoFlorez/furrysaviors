import '../../style/reactComponentsStyle/SearchButton.scss'
import { OptionButton } from "./OptionButton"
import { ModalTest } from './Modal'
import { useState, useRef, useEffect } from 'react'
import useInitialHeight from '../customHooks/useInitialHeight'
import useInitialWidth from '../customHooks/useInitialWidth'
import useMaxInitialWidth from '../customHooks/useMaxInitialWidth'
// importar contexto

export function SearchButton(props) {
  const [clickStatus, setClickStatus] = useState(false)
  const [initialSize, setInitialSize] = useState({})
  const searchButtonRef = useRef(null)
  const searchButtonIconRef = useRef(null)

  const [animation, setAnimation] = useState(false)

  useInitialHeight(searchButtonIconRef, (height) => { setInitialSize(prev => ({ ...prev, searchButtonIconHeight: height })) })
  useMaxInitialWidth(searchButtonIconRef, (width) => { setInitialSize(prev => ({ ...prev, searchButtonIconWidth: width })) })
  useInitialHeight(searchButtonRef, (height) => { setInitialSize(prev => ({ ...prev, searchButtonHeight: height })) })
  useInitialWidth(searchButtonRef, (width) => { setInitialSize(prev => ({ ...prev, searchButtonWidth: width })) })


  const handleClick = () => {
    setClickStatus(!clickStatus)
  }

  const handleSearchBar = () => {
    setAnimation(true)
    setTimeout(() => {
      // setIsHovered(false)
      handleClick()
      setAnimation(false)
    }, 120)
  }

  return (
    <div className='searchButton'
      style={{
        '--searchButtonIconHeight': initialSize.searchButtonIconHeight + 'px',
        '--searchButtonIconWidth': initialSize.searchButtonIconWidth + 'px'
      }}
      ref={searchButtonRef}
    >
      {!clickStatus ?
        <div className='searchButtonIcon' ref={searchButtonIconRef} onClick={() => setClickStatus(!clickStatus)}>
          <OptionButton description={props.description}></OptionButton>
        </div>
        : ( // SEARCH BAR INPUT TO WRITE
          <ModalTest setModalState={handleSearchBar} modalState={clickStatus}>
            <div className={`searchButtonBar ${animation &&'searchButtonAnimation'}`}>
              <input type="text" className="searchInput" placeholder='Search'
                autoFocus
              />

            </div>
          </ModalTest>
        )
      }
    </div>
  )
}