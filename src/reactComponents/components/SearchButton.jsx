import '../../style/reactComponentsStyle/SearchButton.scss'
import { OptionButton } from "./OptionButton"
import { Modal } from './Modal'
import { useState } from 'react'

export function SearchButton(props) {
  const [toggleLogin, setToggleLogin] = useState({
    clickStatus: false,
    animation: false
  })

  return (
    <div className='searchButton'>
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