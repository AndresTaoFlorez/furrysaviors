import '../../style/reactComponentsStyle/SearchButton.scss'
import { OptionButton } from "./OptionButton"
import { Modal } from './Modal'
import { useState, useEffect } from 'react'
import useInitialHeight from '../customHooks/useInitialHeight'
import useInitialWidth from '../customHooks/useInitialWidth'
import useMaxInitialWidth from '../customHooks/useMaxInitialWidth'
// importar contexto

export function SearchButton(props) {
  // const [initialSize, setInitialSize] = useState({})
  const [toggleLogin, setToggleLogin] = useState({
    clickStatus: false,
    animation: false
  })
  // const searchButtonRef = useRef(null)
  // const searchButtonIconRef = useRef(null)


  // useInitialHeight(searchButtonIconRef, (height) => { setInitialSize(prev => ({ ...prev, searchButtonIconHeight: height })) })
  // useMaxInitialWidth(searchButtonIconRef, (width) => { setInitialSize(prev => ({ ...prev, searchButtonIconWidth: width })) })
  // useInitialHeight(searchButtonRef, (height) => { setInitialSize(prev => ({ ...prev, searchButtonHeight: height })) })
  // useInitialWidth(searchButtonRef, (width) => { setInitialSize(prev => ({ ...prev, searchButtonWidth: width })) })

  return (
    <div className='searchButton'
    // style={{
    //   '--searchButtonIconHeight': initialSize.searchButtonIconHeight + 'px',
    //   '--searchButtonIconWidth': initialSize.searchButtonIconWidth + 'px'
    // }}
    // ref={searchButtonRef}
    >
      {
        !toggleLogin.clickStatus ? (
          <div
            className='searchButtonIcon'
            onClick={() => setToggleLogin(() => ({
              clickStatus: true,
              animation: true
            }))}
          >
            <OptionButton description={props.description}></OptionButton>
          </div>
        ) : (
          <Modal
            setToggleLogin={setToggleLogin}
            toggleLogin={toggleLogin}
            duration={100}
          >
            <div className={`searchButtonBar ${!toggleLogin.animation && 'searchButtonAnimation'}`}>
              <input type="text" className="searchInput" placeholder='Search'
                autoFocus
              />
            </div>
          </Modal>
        )
      }


    </div>
  )
}