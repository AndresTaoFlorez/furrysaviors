import '../../style/reactComponentsStyle/moreComponentsStyle/Option1.scss'
import { GlobalContext } from '../context/GlobalContext'
import axios from 'axios'
import { useState, useEffect, useRef, useContext } from 'react'
import { Exception } from 'sass'

export function Option1() {

  const { userSession } = useContext(GlobalContext)
  const [items, setItems] = useState([])
  const richText = useRef(null)

  const [change, setChange] = useState({
    expand: false,
    richText: ''
  })

  const config = {
    readonly: false, // Habilitar/deshabilitar edición
    height: 400, // Altura del editor
    toolbar: true, // Habilitar la barra de herramientas
    showCharsCounter: false, // Contador de caracteres
    showWordsCounter: false, // Contador de palabras
    autofocus: true, // Activar el enfoque automáticamente al cargar el editor
    placeholder: "Escribe algo aquí...", // Texto de marcador de posición
    // Agregar más configuraciones según sea necesario
  };



  useEffect(() => {
    if (!userSession.token) {
      setItems(null)
      return
    }
    getItems()
  }, [userSession])
  
  //functions -----------------------------------------------

  const getItems = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/api/notes', {
        headers: {
          Authorization: userSession.token
        }
      }).catch(error => {
        console.log(error)
      })
      setItems(data.data)
      localStorage
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="option1">
      <div className="option1_content">
        <div className="enter_text">
          enter text
        </div>
        <div className="items">
          <div className="note--void">
            <h1>no hay notas</h1>
          </div>
        </div>
      </div>
    </div>
  )
}