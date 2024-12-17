import { useContext, useState } from "react"
import '../../style/mainComponentsStyle/ContentBody.scss'
import { GlobalContext } from "../context/GlobalContext"

export default function ContentBody() {

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
    </div>
  </>)
}