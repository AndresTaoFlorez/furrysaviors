import '../../style/reactComponentsStyle/moreComponentsStyle/Option1.scss'
import { LoginContext } from '../context/LoginContext'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'

export function Option1() {

  const { userSession } = useContext(LoginContext)
  const [items, setItems] = useState(null)

  useEffect(() => {
    if (!userSession.token) {
      setItems(null)
      return
    }
    const getItems = async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/api/tracks', {
          headers: {
            Authorization: userSession.token
          }
        }).catch(error => {
          console.log(error)
        })
        setItems(data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getItems()
  }, [userSession])

  const isImageUrl = (url) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
    return imageExtensions.some(ext => url.toLowerCase().endsWith(ext));
  }

  return (
    <div className="option1">
      <div className="option1_mainTitle">
        <h1>Option1 from navbar options</h1>
        {userSession.token && (
          <div className="option1_elements">
            {!items ? (
              <p>Loading...</p>
            ) : (
              items.map((item, index) => (
                <div className="option1_elements_child" key={index}>
                  <div className="option1_elements_child_title">
                    <h2>{item?.title || item?.name || 'Sin título'}</h2>
                  </div>
                  <div className="option1_elements_child_info">
                    <div className="two-elements">
                      <p>{item?.artist_name || 'Artista desconocido'}</p>
                      {item?.audio?.url && (
                        isImageUrl(item.audio.url) ? (
                          <a href={item.audio.url} target="_blank" rel="noreferrer">
                            <img className="option1_elements_child_info_audio_image"
                              src={item.audio.url}
                              alt={item.title || 'Imagen'}
                              style={{ maxWidth: '200px' }}
                            />
                          </a>
                        ) : (
                          <p>{item.audio.url}</p>
                        )
                      )}
                    </div>
                    {!isImageUrl(item?.audio?.url) && (
                      <>
                        <label htmlFor="audio">Revisar:</label>
                        <a href={item?.audio?.url || 'URL no disponible'} name="audio" target="_blank" rel="noreferrer"> {item?.audio?.url}</a>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <div className="option1_content">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas et laborum, rem, nesciunt nulla, eligendi aspernatur nobis aperiam assumenda ea quasi cum rerum! Tempore doloribus perferendis culpa nemo molestiae voluptatem error assumenda laborum harum aut voluptas quaerat nam, nobis repellendus. Omnis perspiciatis nisi magnam quisquam enim error quam id consectetur eum repellendus neque temporibus libero commodi earum molestiae et nemo, tempora repellat? Repudiandae, ab. Aliquam numquam distinctio expedita tenetur magnam sapiente officiis nulla obcaecati animi provident, accusamus harum adipisci, unde maxime iusto corporis eum vitae nostrum atque delectus explicabo amet, incidunt odit? Recusandae quam perspiciatis nesciunt, sequi minima fugit? Quam?</p>
      </div>
    </div>
  )
}