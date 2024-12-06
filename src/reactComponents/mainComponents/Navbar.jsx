import '../../style/mainComponentsStyle/Navbar.scss'
import { useRef, useContext, useEffect, useState } from 'react'
import { LoginContext } from '../context/LoginContext'

import { NavbarContext } from '../context/NavbarContext'

import { MenuButton } from '../components/MenuButton'
import { OptionButton } from '../components/OptionButton'
import { SearchButton } from '../components/SearchButton'
import ProtectedRoutes from './ProtectedRoutes'
import { Login } from '../components/Login/Login'
import { Link } from 'react-router-dom'


import useWidth from '../customHooks/useWidth'
import useInitialWidth from '../customHooks/useInitialWidth'
import useMaxInitialWidth from '../customHooks/useMaxInitialWidth'
export default function Header() {
  const navOptionsRef = useRef(null);
  const menuButtonRef = useRef(null);
  const headerContentRef = useRef(null);
  const loginComponentRef = useRef(null);
  const navElementsCount = useRef(null);

  const { generalWidth, setGeneralWidth } = useContext(NavbarContext)
  const { userSession } = useContext(LoginContext)

  const navOptionsRef_width = useWidth(navOptionsRef)
  const headerContentRef_width = useWidth(headerContentRef)

  const [initialWidth, setInitialWidth] = useState({})// Initial width of some refered elements

  const useCalculateInitialWidth = (key, setElementSomething, elementRef) => {
    useInitialWidth(elementRef, (width) => setElementSomething(prev => ({
      ...prev,
      [key]: width // Actualiza correctamente preservando los valores anteriores
    })))
  }

  useCalculateInitialWidth('menuButtonRef_initialWidth', setInitialWidth, menuButtonRef)
  useCalculateInitialWidth('navOptionsRef_initialWidth', setInitialWidth, navOptionsRef)

  // Combinar los efectos relacionados en uno solo y optimizar las dependencias
  useEffect(() => {
    // 1. Calcular el conteo de opciones (solo si cambia headerContentRef_width)
    const newOptionCount = navElementsCount.current
      ? Array.from(navElementsCount.current.querySelectorAll('.option')).length
      : 0;

    // 2. Calcular los anchos
    const threeElementsWidth = {
      menuButton: Number(initialWidth.menuButtonRef_initialWidth) || 0,
      navOption: Number(initialWidth.navOptionsRef_initialWidth) || 0,
      loginComponent: Number(generalWidth?.loginButtonRef_initialWidth) || 0
    };

    const totalWidth = Object.values(threeElementsWidth).reduce((acc, curr) => acc + curr, 0);
    // console.log({totalWidth})
    const brokeThree = headerContentRef_width - (totalWidth + 20);
    const broke = brokeThree <= 0 ? false : true;

    // 3. Actualizar el estado una sola vez con todos los cambios
    setGeneralWidth(prev => {
      // Evitar actualizaciones innecesarias
      if (
        prev.optionsElements === newOptionCount &&
        prev.brokeThree === brokeThree &&
        prev.broke === broke &&
        prev.headerContentRef_width === headerContentRef_width
      ) {
        return prev;
      }

      return {
        ...prev,
        optionsElements: newOptionCount,
        brokeThree: Number(brokeThree) || 0,
        broke,
        headerContentRef_width
      };
    });

  }, [
    // Reducir las dependencias a las esenciales
    headerContentRef_width,
    initialWidth.menuButtonRef_initialWidth,
    initialWidth.navOptionsRef_initialWidth,
    generalWidth?.loginButtonRef_initialWidth
  ]);

  const hasRole = (userRole, allowedRoles) => {
    if (!userRole) return false;
    return userRole.split(',').some(role => allowedRoles.includes(role.trim()));
  };

  return (<>
    <div className='headerContent' ref={headerContentRef}> {/* Absolute */}
      {
        headerContentRef.current &&
        <div className='headerRelativeContent'> {/* Relative */}
          <nav className='headerStickyContent'>
            <div className='menuButtonBox' ref={menuButtonRef}> {/* element 1 ---------- */}
              <MenuButton description='☰'></MenuButton>
            </div>
            <div ref={navElementsCount}>
              {generalWidth.broke &&
                <ul className='navOptions' ref={navOptionsRef}>
                  <Link className='option' to={'home'}>
                    <OptionButton description='home'></OptionButton>
                  </Link>

                  <SearchButton description='🔍' id='searchButton'></SearchButton>

                  {/* Option1 - solo admin */}
                  {hasRole(userSession?.user?.role, ['admin']) && (
                    <Link className='option' to={'option1'}>
                      <OptionButton description='option 1'></OptionButton>
                    </Link>
                  )}

                  {/* Option2 - admin o user */}
                  {hasRole(userSession?.user?.role, ['admin', 'user']) && (
                    <Link className='option' to={'option2'}>
                      <OptionButton description='option 2'></OptionButton>
                    </Link>
                  )}

                  {/* Option3 - solo admin */}
                  {hasRole(userSession?.user?.role, ['admin']) && (
                    <Link className='option' to={'option3'}>
                      <OptionButton description='option 3'></OptionButton>
                    </Link>
                  )}

                </ul>
              }
            </div>
            <div className='loginComponent' ref={loginComponentRef}>
              {/* element 3 ---------- */}
              <Login />
            </div>
          </nav>
        </div >
      }
    </div >
  </>)
}