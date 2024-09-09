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
      <div className="testingTitles">
        {/* <h1>Broken: {String(generalWidth.broke)}</h1> */}
        <h1>Broken: {generalWidth.optionsElements}</h1>
      </div>
      <div className="mainTitle">
        <h1>Furry Saviors</h1>
      </div>
    </div>
    <div className="contentBodyContent">
      {/* <SearchButton description="Search"></SearchButton> */}
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