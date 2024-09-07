import '../../style/mainComponentsStyle/Navbar.scss'
import { useRef, useContext, useEffect, useState } from 'react'

import { NavbarContext } from '../context/NavbarContext'

import { MenuButton } from '../components/MenuButton'
import { OptionButton } from '../components/OptionButton'
import { SearchButton } from '../components/SearchButton'
import { Login } from '../components/Login'

import useWidth from '../customHooks/useWidth'
import useInitialWidth from '../customHooks/useInitialWidth'
export default function Header() {
  const navOptionsRef = useRef(null);
  const menuButtonRef = useRef(null);
  const headerContentRef = useRef(null);
  const loginComponentRef = useRef(null);

  const { generalWidth, setGeneralWidth } = useContext(NavbarContext)

  // const navOptionsRef_width = useWidth(navOptionsRef)
  // const menuButtonRef_width = useWidth(menuButtonRef)
  const headerContentRef_width = useWidth(headerContentRef)

  const [initialWidth, setInitialWidth] = useState({ // Initial width of some refered elements
    navOptionsRef_initialWidth: 0,
    menuButtonRef_initialWidth: 0
  })

  useEffect(() => {
    console.log(initialWidth);
  }, [initialWidth])

  // Guardar los anchos iniciales de algunos elementos referenciados
  useInitialWidth(navOptionsRef, (width) => setInitialWidth({
    ...initialWidth,
    navOptionsRef_initialWidth: width
  }));
  useInitialWidth(menuButtonRef, (width) => setInitialWidth({
    ...initialWidth,
    menuButtonRef_initialWidth: width
  }));
  useInitialWidth(headerContentRef, (width) => setInitialWidth({
    ...initialWidth,
    headerContentRef_initialWidth: width
  }));
  useInitialWidth(loginComponentRef, (width) => setInitialWidth({
    ...initialWidth,
    loginComponentRef_initialWidth: width
  }));


  // Calcular margin derecho del navbar options
  // const [calculate, setCalculate] = useState('')


  useEffect(() => {

    const brokeTwo =
    (Number(initialWidth.menuButtonRef_initialWidth) || 0) +
    (Number(initialWidth.navOptionsRef_initialWidth) || 0) +
    (Number(initialWidth.loginComponentRef_initialWidth) || 0) + 84;
    const brokeThree = headerContentRef_width - brokeTwo
    
    const broke = brokeThree <= 0 ? false : true
    setGeneralWidth({ broke })

    setGeneralWidth(e=>({...e, headerContentRef_width}))

    // console.log(`brokeOne: ${brokeOne} - brokeTwo: ${brokeTwo} = ${brokeThree}`);
  }, [
    headerContentRef_width,
    initialWidth,
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