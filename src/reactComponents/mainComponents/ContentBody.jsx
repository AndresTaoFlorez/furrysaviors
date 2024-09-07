import { useContext, useEffect, useState } from "react"
import { NavbarContext } from "../context/NavbarContext"
import '../../style/mainComponentsStyle/ContentBody.scss'
export default function ContentBody() {
  const { generalWidth } = useContext(NavbarContext)
  const [results, setResults] = useState([])

  useEffect(() => {
    fetch('https://hipsum.co/api/?type=hipster-centric&paragraphs=2')
      .then(response => response.json())
      .then(data => setResults(data));
  }, [])

  return (<>
    <div className="homePage">
      {/* <h2>Navbar Options width: {generalWidth.navOptionsRef}</h2>
      <h2>Navbar Options between divided into two: {generalWidth.navOptionsRef/2}</h2>
      <h2>Navbar MenuButton width: {generalWidth.floatingButtonRef}</h2>
      <h2>Sum between Options and MenuButton : {generalWidth.floatingButtonRef+generalWidth.navOptionsRef}</h2>

      <h2>Navbar headerContent width: {generalWidth.headerContentRef}</h2>
      <h2>Navbar headerContent divided into two: {generalWidth.headerContentRef/2}</h2> 
      <h1 style={{'color': 'white'}}>Broken: {String(generalWidth.broke)}</h1>
      */}
      <div className="mainTitle">
        <h1>Furry Saviors</h1>
      </div>
    </div>
    <div className="contentBodyContent">
      <h1>ContentBody</h1>
      {results.map((result, index) => (
        <div className="contentBodyCard" key={index}>
          <h1>Title</h1>
          <div>{result}</div>
        </div>
      ))}
    </div>
  </>)
}