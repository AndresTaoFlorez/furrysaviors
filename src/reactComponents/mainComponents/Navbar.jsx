import '../../style/mainComponentsStyle/Navbar.scss'
import { useRef, useContext, useEffect, useState } from 'react'

import { NavbarContext } from '../context/NavbarContext'

import { MenuButton } from '../components/MenuButton'
import { OptionButton } from '../components/OptionButton'
import { SearchButton } from '../components/SearchButton'
import { Login } from '../components/Login'
import { Link } from 'react-router-dom'


import useWidth from '../customHooks/useWidth'
import useInitialWidth from '../customHooks/useInitialWidth'
import useMaxInitialWidth from '../customHooks/useMaxInitialWidth'
// import Modal from '../components/Modal'
export default function Header() {
  const navOptionsRef = useRef(null);
  const menuButtonRef = useRef(null);
  const headerContentRef = useRef(null);
  const loginComponentRef = useRef(null);
  const navElementsCount = useRef(null);

  const { generalWidth, setGeneralWidth } = useContext(NavbarContext)

  const navOptionsRef_width = useWidth(navOptionsRef)
  const headerContentRef_width = useWidth(headerContentRef)

  const [initialWidth, setInitialWidth] = useState({})// Initial width of some refered elements

  const useCalculateInitialWidth = (key, setElementSomething, elementRef) => {
    useInitialWidth(elementRef, (width) => setElementSomething(prev => ({
      ...prev,
      [key]: width // Actualiza correctamente preservando los valores anteriores
    })))
  }
  const useCalculateMaxInitialWidth = (key, setElementSomething, elementRef) => {
    useMaxInitialWidth(elementRef, (width) => setElementSomething(prev => ({
      ...prev,
      [key]: width // Actualiza correctamente preservando los valores anteriores
    })))
  }

  useCalculateInitialWidth('menuButtonRef_initialWidth', setInitialWidth, menuButtonRef)
  useCalculateMaxInitialWidth('loginComponentRef_initialWidth', setInitialWidth, loginComponentRef)

  // ------- counter of elements
  const [optionCount, setOptionCount] = useState(0); // Estado para almacenar el conteo
  useEffect(() => {
    if (navElementsCount.current) {
      const optionElements = navElementsCount.current.querySelectorAll('.option');
      setOptionCount(Array.from(optionElements).length)
    }

    setGeneralWidth(prev => ({
      ...prev,
      optionsElements: Number(optionCount)
    }))
    // console.log(optionCount);

  }, [headerContentRef_width, initialWidth]);
  // ------- end --- counter of elements

  // ------- EXPERIMENTO

  // ASD0001:
  // useEffect(() => {
  //   if (navElementsCount.current && !generalWidth.broke) {
  //     const optionElements = navElementsCount.current.querySelectorAll('.option');
  //     const lastElement = optionElements[optionCount - 1]; // Acceder al último elemento
  //     // console.log('Último elemento:', lastElement);
  //     if (lastElement) {
  //       lastElement.remove(); // Eliminar el último elemento del DOM
  //       // console.log('Último elemento eliminado');
  //       // setOptionCount(optionElements.length - 1)
  //       // Aquí puedes manipular el último elemento si es necesario
  //       setOptionCount(optionElements.length - 1);
  //     }
  //   }
  // }, [generalWidth.broke],[]); // Dependencias actualizadas


  // ------- END EXPERIMENTO


  useEffect(() => {
    // console.log(generalWidth)
    setInitialWidth(prev => ({
      ...prev,
      navOptionsRef_initialWidth: Number(navOptionsRef_width) || 0
    }))

    const brokeTwo =
      initialWidth.menuButtonRef_initialWidth +
      initialWidth.navOptionsRef_initialWidth +
      initialWidth.loginComponentRef_initialWidth +
      (Number(generalWidth.brokeThree) || 0)

    const brokeThree = headerContentRef_width - (brokeTwo + 20)
    setGeneralWidth(e => ({ ...e, brokeThree: (Number(brokeThree) || 0) }));

    const broke = brokeThree <= 0 ? false : true
    setGeneralWidth({ broke })

    setGeneralWidth(e => ({ ...e, headerContentRef_width }))

    // console.log(`MenuBar ${initialWidth.menuButtonRef_initialWidth} / Options: ${initialWidth.navOptionsRef_initialWidth} / ${initialWidth.loginComponentRef_initialWidth}`)
    // console.log(`brokeOne: ${headerContentRef_width} - brokeTwo: ${brokeTwo} = ${brokeThree}`)
  }, [
    navOptionsRef_width,
    headerContentRef_width,
    initialWidth.navOptionsRef_width
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
            <div ref={navElementsCount}>
              {generalWidth.broke && // element 2 ----------
                <ul className="navOptions" ref={navOptionsRef}>
                  <Link className="option" to="/home">
                    <OptionButton description="home"></OptionButton>
                  </Link>
                  <Link className="option" to={"/option1"}>
                    <OptionButton description="option 1"></OptionButton>
                  </Link>
                  <SearchButton description="🔍" id="searchButton"></SearchButton>
                  <Link className="option" to="/option2">
                    <OptionButton description="option 2"></OptionButton>
                  </Link>
                  <Link className="option" to="/option3">
                    <OptionButton description="option 3"></OptionButton>
                  </Link>
                </ul>
              }
            </div>
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