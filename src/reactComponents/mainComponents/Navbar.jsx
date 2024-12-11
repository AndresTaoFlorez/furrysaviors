import '../../style/mainComponentsStyle/Navbar.scss'
import { useRef, useContext } from 'react'
import { MenuButton } from '../components/MenuButton'
import { OptionButton } from '../components/OptionButton'
import { SearchButton } from '../components/SearchButton'
import { Login } from '../components/Login/Login'
import { Link } from 'react-router-dom'
import { useActiveClass } from '../customHooks/useActiveClass'
import { GlobalContext } from '../context/GlobalContext'
import { useLocation } from 'react-router-dom';



export default function Header() {

  const { userSession, config, setConfig } = useContext(GlobalContext)

  const navOptionsRef = useRef(null);

  useActiveClass({
    elementRef: navOptionsRef,
    state: config,
    setState: setConfig,
    notChild: ['searchButton', 'home'],
    stateAdditionalData: {
      currentUrl: useLocation().pathname,
    }
  })

  const hasRole = (allowedRoles) => {
    const userRole = userSession?.user?.role;
    if (!userRole) return;
    return userRole.split(',').some(role => allowedRoles.includes(role.trim()));
  };

  return (<>
    <div className='headerContent'> {/* Absolute */}
      <div className='headerRelativeContent'> {/* Relative */}
        <nav className='headerStickyContent'>
          <div className='menuButtonBox'> {/* element 1 ---------- */}
            <MenuButton description='☰'></MenuButton>
          </div>
          <div>
            <ul className='navOptions' ref={navOptionsRef}>  {/* Navcar Element Content */}

              <Link className='option' id='home' to={'home'}>
                <OptionButton description='home'></OptionButton>
              </Link>

              <SearchButton description='🔍'></SearchButton>

              {/* Option1 - solo admin */}
              {hasRole(['admin']) && (
                <Link className='option' to={'option1'}>
                  <OptionButton description='option 1'></OptionButton>
                </Link>
              )}

              {/* Option2 - admin o user */}
              {hasRole(['admin', 'user']) && (
                <Link className='option' to={'option2'}>
                  <OptionButton description='option 2'></OptionButton>
                </Link>
              )}

              {/* Option3 - solo admin */}
              {hasRole(['admin']) && (
                <Link className='option' to={'option3'}>
                  <OptionButton description='option 3'></OptionButton>
                </Link>
              )}

            </ul>
          </div>
          <div className='loginComponent'>
            {/* element 3 ---------- */}
            <Login />
          </div>
        </nav>
      </div >
    </div >
  </>)
}




