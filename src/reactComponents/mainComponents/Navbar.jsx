import '../../style/mainComponentsStyle/Navbar.scss'
import { useRef, useContext, useEffect, useState } from 'react'

import { NavbarContext } from '../context/NavbarContext'

import { FloatingButton } from '../components/FloatingButton'
import { OptionButton } from '../components/OptionButton'
import useWidth from '../customHooks/useWidth'
export default function Header() {
  const navOptionsRef = useRef(null);
  const floatingButtonRef = useRef(null);
  const headerContentRef = useRef(null);
  
  const { generalWidth, setGeneralWidth } = useContext(NavbarContext)

  const navOptionsRef_width = useWidth(navOptionsRef)
  const floatingButtonRef_width = useWidth(floatingButtonRef)
  const headerContentRef_width = useWidth(headerContentRef)


  useEffect(() => {
    const broke = (navOptionsRef_width + floatingButtonRef_width + 25) > headerContentRef_width ? false : true;
    console.log(broke);

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
    floatingButtonRef_width
  ]);

  return (<>
    <div className="headerContent" ref={headerContentRef}> {/* Absolute */}
      <div className='headerRelativeContent'> {/* Relative */}
        {generalWidth.broke === true && (
          <>
            <nav className='headerStickyContent'>
              <div className="floatingButtonBox" ref={floatingButtonRef}>
                <FloatingButton description="☰"></FloatingButton>
              </div>
              <ul className="navOptions" ref={navOptionsRef}>
                <OptionButton description="description"></OptionButton>
                <OptionButton description="option 1"></OptionButton>
                <OptionButton description="option 2"></OptionButton>
              </ul>
            </nav>
          </>
        )}

      </div>
    </div>
  </>)
}