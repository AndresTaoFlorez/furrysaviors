import { useState } from "react"
import '../../style/mainComponentsStyle/ContentBody.scss'

export default function ContentBody() {
  const [results] = useState([])

  return (<>
    <div className="homePage">
      <div className="testingTitles">
      </div>
      <div className="mainTitle">
        <h1>Furry Saviors</h1>
      </div>
    </div>
    <div className="contentBodyContent">
      <h1>ContentBody</h1>
      {results.map((result, index) => (
        <div className="contentBodyCard" key={index}>
          
          <h1>Title</h1>
          <div>{result.content}</div>
        </div>
      ))}
    </div>
  </>)
}