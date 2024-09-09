import '../../style/reactComponentsStyle/moreComponentsStyle/ElementsA.scss'
import { useContext, useRef, useEffect, useState } from 'react'
import { NavbarContext } from '../context/NavbarContext'
// Custom hooks
import useInitialWidth from '../customHooks/useInitialWidth'

export function ElementsA() {

  const elementRef = useRef(null) // define Ref Element
  const { generalWidth } = useContext(NavbarContext)
  const [referedWidth, setReferedWidth] = useState({})
  const [elementsCount, setElementsCount] = useState({})
  const [elementsWidth, setElementsWidth] = useState([])


  // 🥊 Guardar los anchos de los elementos hijos
  useEffect(() => {
    if (elementRef.current) {
      // Obtener los elementos hijos del contenedor
      const childElements = Array.from(elementRef.current.children);

      // Mapear sobre los elementos hijos y obtener su offsetWidth
      const widths = childElements.map((element) => {
        return element ? element.offsetWidth : 0; // Evitar errores si algún elemento es null
      });

      setElementsWidth(widths); // Guardar los anchos en el estado
    }
  }, [generalWidth]); // Ejecutar cuando `generalWidth` o `generalWidth.headerContentRef_width` cambien

  // Para mostrar los anchos calculados
  useEffect(() => {
    if (elementsWidth.length > 0) {
      elementsWidth.forEach((width, index) => {
        console.log(`Ancho de elemento ${index + 1}:`, width);
      });
    }
  }, [generalWidth]); // Mostrar cuando `elementsWidth` se actualiza


  // 🥊 calculate elements length from reference
  useEffect(() => {
    const elements = elementRef.current.children
    const elementsLength = elements.length
    setElementsCount((prev) => ({
      ...prev,
      elementsLength
    }))
    console.log(`-------------------`);
    // console.log(`Elements length: ${elementsCount.elementsLength}`);

  }, [generalWidth], [])

  // 🥊 calculate elements content width
  const handleWidth = (e, value) => { // Clave - Valor
    setReferedWidth((prev) => ({
      ...prev,
      [e]: value
    }))
  }
  useInitialWidth(elementRef, (e) => {
    handleWidth('referenceContent_width', e)
  })
  useEffect(() => {
    // Es importante sumar un margen de tamaño como 20px o más
    // console.log(`Content Width: ${referedWidth.referenceContent_width + 70}`);
  }, [referedWidth])

  // 🥊 calculate windows width
  useEffect(() => {
    // console.log(`Windows Width: ${generalWidth.headerContentRef_width + 15}`); // Hay una diferencia de 15px menos acá
  }, [generalWidth])
  return (<>

    <div className="elementsA">
      <h1>ElementsA</h1>
      <h1>Count: {elementsCount.elementsLength}</h1>
      {elementsWidth.map((e, i) => (<div key={i}>
        <h2>ElementsWidth: {e}</h2>
      </div>
      ))}
      <div className='referenceContent' ref={elementRef}>
        <div className='element'>option1</div>
        <div className='element'>option2</div>
        <div className='element'>option3</div>
        <div className='element'>option4</div>
        <div className='element'>option5</div>
      </div>
    </div>
  </>)
}