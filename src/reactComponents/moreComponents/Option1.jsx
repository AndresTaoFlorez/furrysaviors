import '../../style/reactComponentsStyle/moreComponentsStyle/Option1.scss'
import { LoginContext } from '../context/LoginContext'
import RichText from './RichText.jsx'
import axios from 'axios'
import JoditEditor from 'jodit-react'
import { useState, useEffect, useRef, useContext } from 'react'
import DOMPurify from "dompurify"
import { Exception } from 'sass'

export function Option1() {

  const { userSession } = useContext(LoginContext)
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


  useEffect(() => {
    if (richText.current) {
      richText.current.focus()
    }
    console.log(change.richText)
  }, [change])

  const isImageUrl = (url) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    return imageExtensions.some(ext => url.toLowerCase().endsWith(ext));
  }

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

  const handleExpandText = () => {
    setChange((prev) => ({
      ...prev,
      expand: !change.expand
    }))
  }

  const handleContentChange = (newContent) => {

    // const dirtyHtml = richText.current.innerHTML
    // const preCleanHtml = DOMPurify.sanitize(dirtyHtml, { WHOLE_DOCUMENT: true })

    // if (richText.current) {
    //   setChange((prev) => ({
    //     ...prev,
    //     richText: cleanHtml
    //   }))
    // }

    setChange((prev) => ({
      ...prev,
      richText: newContent
    }))
  }

  const handleSave = async () => {
    const html_content = change.richTexth
    await axios.post('http://localhost:3001/api/notes/', { title: "untitle", html_content }, {
      headers: {
        Authorization: userSession.token
      }
    }).catch(error => {
      console.log(error)
    })


    getItems()
  }

  const handleDelete = async (id) => {
    console.log(id)
    await axios.delete(`http://localhost:3001/api/notes/${id}`, {
      headers: {
        Authorization: userSession.token
      }
    }).catch(error => {
      console.log(error)
    })
    console.log('delete')
    getItems()
  }

  const handleCopy = (item) => async () => {
    const htmlContent = item.html_content;
    try {
      // Copiar el contenido HTML al portapapeles
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([htmlContent], { type: 'text/html' }),
          'text/plain': new Blob([htmlContent.replace(/(?:\r\n|\r|\n)/g, '\n')], { type: 'text/plain' })
        })
      ]);
      console.log('Contenido copiado con formato HTML');
    } catch (error) {
      console.error('Error al copiar el contenido:', error);
    }
  }

  const handlePaste = (e) => {
    e.preventDefault();

    const html = e.clipboardData.getData('text/html');
    !html && exit()

    sanitizedHtml = DOMPurify.sanitize(html)
    setChange((prev) => ({
      ...prev,
      richText: sanitizedHtml
    }))
  };

  return (
    <div className="option1">
      <div className="option1_content">
        <div className="enter_text">

          <div className="editable--capsule">
            {change.expand ? (
              <div className="editable--capsule--text--button" onClick={handleExpandText}>
                <label>New note</label>
              </div>
            ) : (
              <div className="editable--capsule--text--expanded">
                {/* <div
                  className='richtext'
                  ref={richText}
                  contentEditable="true"
                  onPaste={() => handlePaste}
                  onInput={handleContentChange}
                  value={change.richText}
                  autoFocus>
                </div> */}
                <RichText handleChange={handleContentChange}></RichText>
                <button onClick={handleSave}>Save</button>
                <button onClick={handleExpandText}>Exit</button>
              </div>
            )}
          </div>
        </div>
        <div className="items">
          {items.length > 0 ? (
            items.map((item, index) => (
              <div className="note" key={index}>
                <div className="note--title">
                  <h1>{item.title}</h1><p>{item.id}</p>
                  <div className="note--copy">
                    <button className='note--copy--button' onClick={handleCopy(item)}>copy</button>
                  </div>
                </div>
                <RichText></RichText>
                {/* html content from data base */}
                <div className='html_content' dangerouslySetInnerHTML={{ __html: item.html_content }} />
                <button className='delete' onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            ))
          ) : (
            <div className="note--void">
              <h1>no hay notas</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}