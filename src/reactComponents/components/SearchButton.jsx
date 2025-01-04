import '../../style/reactComponentsStyle/SearchButton.scss'
import { Modal } from './Modal'
import { useEffect, useState } from 'react'

export function SearchButton({ description, id }) {
  const [toggleLogin, setToggleLogin] = useState({
    clickStatus: false,
    animation: false
  })

  useEffect(() => {
    document.querySelector(".searchButtonIcon")?.classList.replace("animate", "noAnimation");
  }, []);
  

  return (
    <div className='searchButton' id={id}>
      {
        !toggleLogin.clickStatus ? (
          <div
            className={`searchButtonIcon animate optionButtonComponent`}
            onClick={() => setToggleLogin(() => ({
              clickStatus: true,
              animation: true
            }))}
          >
            {description}
          </div>
        ) : (
          <Modal
            setToggleLogin={setToggleLogin}
            toggleLogin={toggleLogin}
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