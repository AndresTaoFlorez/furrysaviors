import '../../style/mainComponentsStyle/Navbar.scss'
import { useRef, useContext, useEffect, useState } from 'react'

import { NavbarContext } from '../context/NavbarContext'

import { FloatingButton } from '../components/FloatingButton'
import { OptionButton } from '../components/OptionButton'
import { SearchButton } from '../components/SearchButton'
import { Login } from '../components/Login'

import useWidth from '../customHooks/useWidth'
import useInitialWidth from '../customHooks/useInicialWidth'
export default function Header() {
  const navOptionsRef = useRef(null);
  const floatingButtonRef = useRef(null);
  const headerContentRef = useRef(null);

  const { generalWidth, setGeneralWidth } = useContext(NavbarContext)

  const navOptionsRef_width = useWidth(navOptionsRef)
  const floatingButtonRef_width = useWidth(floatingButtonRef)
  const headerContentRef_width = useWidth(headerContentRef)

  const [initialWidth, setInitialWidth] = useState({ // Initial width of some refered elements
    navOptionsRef_initialWidth: 0,
    floatingButtonRef_initialWidth: 0
  })

  const broke = ((((Number(initialWidth.floatingButtonRef_initialWidth) || 0) + (Number(initialWidth.navOptionsRef_initialWidth) || 0) + 33) < (Number(headerContentRef_width) || 0))) ? true : false

  // Guardar los anchos iniciales de algunos elementos referenciados
  useInitialWidth(navOptionsRef, (width) => setInitialWidth({
    ...initialWidth,
    navOptionsRef_initialWidth: width
  }));
  useInitialWidth(floatingButtonRef, (width) => setInitialWidth({
    ...initialWidth,
    floatingButtonRef_initialWidth: width
  }));
  useInitialWidth(headerContentRef, (width) => setInitialWidth({
    ...initialWidth,
    headerContentRef_initialWidth: width
  }));
 

  // Calcular margin derecho del navbar options
  const [calculate, setCalculate] = useState('')

  useEffect(() => {
    // setCalculate((generalWidth.floatingButtonRef_initialWidth/2) - (initialWidth.navOptionsRef_initialWidth/2))
    const newcalculate = `${((Number(generalWidth.headerContentRef) / 2) || 0) - ((Number(generalWidth.navOptionsRef) / 2) || 0)}px`

    setCalculate(newcalculate)

    // console.log(`${generalWidth.headerContentRef/2} - ${generalWidth.navOptionsRef/2} - ${generalWidth.loginComponentRef} = ${newcalculate}`);


  }, [generalWidth])

  useEffect(() => {

    setGeneralWidth({
      navOptionsRef: navOptionsRef_width,
      floatingButtonRef: floatingButtonRef_width,
      headerContentRef: headerContentRef_width,
      broke
    });

  }, [
    headerContentRef_width,
    setGeneralWidth,
    navOptionsRef_width,
    floatingButtonRef_width,
    broke
  ]);

  return (<>
    <div className="headerContent" ref={headerContentRef}> {/* Absolute */}
      <div className='headerRelativeContent'> {/* Relative */}
        <nav className='headerStickyContent'>
          <div className="floatingButtonBox" ref={floatingButtonRef}>
            <FloatingButton description="☰"></FloatingButton>
          </div>
          {broke &&
            <ul className="navOptions" ref={navOptionsRef}
              style={{ '--marginRight': `${calculate}` }}>
              <OptionButton description="option 1"></OptionButton>
              <OptionButton description="option 2"></OptionButton>
              <SearchButton description="🔍" id="searchButton"></SearchButton>
              <OptionButton description="option 3"></OptionButton>
              <OptionButton description="option 4"></OptionButton>
            </ul>
          }
          <div className="loginComponent">
            <Login></Login>
          </div>
        </nav>
      </div>
    </div>
  </>)
}