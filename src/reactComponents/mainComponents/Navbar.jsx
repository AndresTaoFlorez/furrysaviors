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

const Navbar = () => {
  const { userSession, config, setConfig, changeToThisIndex, menuOptions, currentUrl } = useContext(GlobalContext)
  const navOptionsRef = useRef(null);
  const [additionalConfig, setAdditionalConfig] = useState(null)

  useEffect(() => {
    setAdditionalConfig({ currentUrl })
  }, [currentUrl])

  const options = useMemo(() => ({
    elementRef: navOptionsRef,
    config,
    setConfig,
    additionalConfig,
    notChild: ['searchButton'],
    changeToThisIndex
  }), [additionalConfig, config, navOptionsRef]);

  useActiveClass(options);

  const hasRole = (allowedRoles) => {
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
            <Link className='option' to={menuOptions?.option0}>
              <OptionButton id={menuOptions?.option0} description={menuOptions?.option0} />
            </Link>
            <SearchButton description='🔍' />

            {(hasRole(['admin']) && !isBad(userSession)) && (
              <Link className='option' to={menuOptions?.option1}>
                <OptionButton id={menuOptions?.option1} description={menuOptions?.option1} />
              </Link>
            )}

            {(hasRole(['admin', 'user']) && !isBad(userSession)) && (
              <Link className='option' to={menuOptions?.option2}>
                <OptionButton id={menuOptions?.option2} description={menuOptions?.option2} />
              </Link>
            )}

            {(hasRole(['admin']) && !isBad(userSession)) && (
              <Link className='option' to={menuOptions?.option3}>
                <OptionButton id={menuOptions?.option3} description={menuOptions?.option3} />
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