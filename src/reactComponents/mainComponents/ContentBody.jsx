import { useContext, useEffect, useState } from "react"
import { NavbarContext } from "../context/NavbarContext"
import '../../style/mainComponentsStyle/ContentBody.scss'
export default function ContentBody() {
  const { generalWidth } = useContext(NavbarContext)
  const [results, setResults] = useState([])

  useEffect(() => {
    fetch('https://hipsum.co/api/?type=hipster-centric&paragraphs=10')
      .then(response => response.json())
      .then(data => setResults(data));
  }, [])

  return (<>
    <div className="homePage">
      <h2>Navbar Options width: {generalWidth.navOptionsRef}</h2>
      <h2>Navbar MenuButton width: {generalWidth.floatingButtonRef}</h2>
      <h2>Navbar headerContent width: {generalWidth.headerContentRef}</h2>
      <h2>Broken: {String(generalWidth.broke)}</h2>
      </div>
    <div className="contentBodyContent">
      {results.map((result, index) => (
        <div className="contentBodyCard" key={index}>
          <h1>Title</h1>
          <div>{result}</div>
        </div>
      ))}
    </div>
    <h1>ContentBody</h1>
  </>)
}