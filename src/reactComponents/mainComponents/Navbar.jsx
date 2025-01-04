import '../../style/mainComponentsStyle/Navbar.scss'
import { useRef, useContext, useState, useEffect, useMemo } from 'react'
import { MenuButton } from '../components/MenuButton'
import { OptionButton } from '../components/OptionButton'
import { SearchButton } from '../components/SearchButton'
import { useActiveClass } from '../customHooks/useActiveClass'
import { Login } from '../components/Login/Login'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalContext'
import { isBad } from '../../services.js/dataVerify'
import { isFunction } from '../../services.js/dataVerify'

const Navbar = () => {
  const { userSession, config, setConfig, menuOptions, currentUrl } = useContext(GlobalContext)
  const navOptionsRef = useRef(null);
  const [additionalConfig, setAdditionalConfig] = useState(null)

  useEffect(() => {
    setAdditionalConfig({ currentUrl })
  }, [currentUrl])

  const options = useMemo(() => {
    const dependencies = userSession?.token ? {
      config,
      setConfig,
      additionalConfig,
    } : {}
    const essentialConfig = {
      elementRef: navOptionsRef,
      notChild: ['searchButton'],
    }
    return { ...dependencies, ...essentialConfig }
  }, [additionalConfig, config, navOptionsRef]);

  const { updateActiveClass = () => { } } = useActiveClass(options) || {};

  const handleClick = (e) => {
    updateActiveClass({ targetElement: e.target.parentElement, elementRef: navOptionsRef, notChild: ['searchButton'] })
  };

  const hasRole = (allowedRoles) => {
    if (!userSession) return false;
    const userRole = userSession?.user?.role;
    if (!userRole) return false;
    return userRole.split(',').some(role => allowedRoles.includes(role.trim()));
  };

  return (
    <div className='headerContent'>
      <div className='headerRelativeContent'>
        <nav className='headerStickyContent'>
          <div className='menuButtonBox'>
            <MenuButton description='☰' />
          </div>
          <div className='navOptions' ref={navOptionsRef}>

            <Link to={menuOptions?.option0} id={menuOptions?.option0} onClick={handleClick}>
              <OptionButton >
                {menuOptions?.option0} {/* Home */}
              </OptionButton>
            </Link>

            <SearchButton description='🔍' id='searchButton' />


            {(hasRole(['admin'])) && (
              <Link to={menuOptions?.option1} id={menuOptions?.option1} onClick={handleClick} >
                <OptionButton>
                  {menuOptions?.option1}
                </OptionButton>
              </Link>
            )}

            {(hasRole(['admin', 'user'])) && (
              <Link to={menuOptions?.option2} id={menuOptions?.option2} onClick={handleClick}>
                <OptionButton >
                  {menuOptions?.option2}
                </OptionButton>
              </Link>
            )}

            {(hasRole(['admin'])) && (
              <Link to={menuOptions?.option3} id={menuOptions?.option3} onClick={handleClick}>
                <OptionButton>
                  {menuOptions?.option3}
                </OptionButton>
              </Link>
            )}
          </div>
          <div className='loginComponent'>
            <Login />
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar