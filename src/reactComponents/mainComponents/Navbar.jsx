import '../../style/mainComponentsStyle/Navbar.scss'
import { useRef, useContext, useEffect, useState } from 'react'

import { NavbarContext } from '../context/NavbarContext'

import { MenuButton } from '../components/MenuButton'
import { OptionButton } from '../components/OptionButton'
import { SearchButton } from '../components/SearchButton'
import { Login } from '../components/Login'

import useWidth from '../customHooks/useWidth'
import useInitialWidth from '../customHooks/useInitialWidth'
// import Modal from '../components/Modal'
export default function Header() {
  const navOptionsRef = useRef(null);
  const menuButtonRef = useRef(null);
  const headerContentRef = useRef(null);
  const loginComponentRef = useRef(null);

  const { generalWidth, setGeneralWidth } = useContext(NavbarContext)

  const navOptionsRef_width = useWidth(navOptionsRef)
  // const menuButtonRef_width = useWidth(menuButtonRef)
  const headerContentRef_width = useWidth(headerContentRef)

  const [initialWidth, setInitialWidth] = useState({ // Initial width of some refered elements
    navOptionsRef_initialWidth: 0,
    menuButtonRef_initialWidth: 0
  })

  // Guardar los anchos iniciales de algunos elementos referenciados
  // useInitialWidth(navOptionsRef, (width) => setInitialWidth(prev => ({
  //   ...prev,
  //   navOptionsRef_initialWidth: width
  // })));
  useInitialWidth(menuButtonRef, (width) => setInitialWidth(prev => ({
    ...prev,
    menuButtonRef_initialWidth: width // Actualiza correctamente preservando los valores anteriores
  })));
  useInitialWidth(headerContentRef, (width) => setInitialWidth(prev => ({
    ...prev,
    headerContentRef_initialWidth: width
  })));
  useInitialWidth(loginComponentRef, (width) => setInitialWidth(prev => ({
    ...prev,
    loginComponentRef_initialWidth: width
  })));



  // Calcular margin derecho del navbar options
  // const [calculate, setCalculate] = useState('')


  useEffect(() => {

    setInitialWidth(prev => ({
      ...prev,
      navOptionsRef_initialWidth: Number(navOptionsRef_width) || 0
    }))

    const brokeTwo =
      initialWidth.menuButtonRef_initialWidth +
      initialWidth.navOptionsRef_initialWidth +
      initialWidth.loginComponentRef_initialWidth +
      (Number(generalWidth.brokeThree) || 0)

    const brokeThree = headerContentRef_width - (brokeTwo + 15)
    setGeneralWidth(e => ({ ...e, brokeThree: (Number(brokeThree) || 0) }));

    const broke = brokeThree <= 0 ? false : true
    setGeneralWidth({ broke })

    setGeneralWidth(e => ({ ...e, headerContentRef_width }))

    // console.log(`brokeOne: ${headerContentRef_width} - brokeTwo: ${brokeTwo} = ${brokeThree}`)
  }, [
    navOptionsRef_width,
    headerContentRef_width
    // initialWidth
  ]);

  return (<>
    <div className="headerContent" ref={headerContentRef}> {/* Absolute */}
      {
        headerContentRef.current &&
        <div className='headerRelativeContent'> {/* Relative */}
          <nav className='headerStickyContent'>
            <div className="menuButtonBox" ref={menuButtonRef}> {/* element 1 ---------- */}
              <MenuButton description="☰"></MenuButton>
            </div>
            {generalWidth.broke &&
              <ul className="navOptions" ref={navOptionsRef} // element 2 ----------
              // style={{ '--marginRight': `${calculate}` }}
              >
                <OptionButton description="option 1"></OptionButton>
                <OptionButton description="option 2"></OptionButton>
                <SearchButton description="🔍" id="searchButton"></SearchButton>
                <OptionButton description="option 3"></OptionButton>
                <OptionButton description="option 4"></OptionButton>
              </ul>
            }
            <div className="loginComponent" ref={loginComponentRef}>
              {/* element 3 ---------- */}
              <Login />
            </div>
          </nav>
        </div>
      }
    </div>
  </>)
}