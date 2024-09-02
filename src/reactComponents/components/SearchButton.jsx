import '../../style/reactComponentsStyle/SearchButton.scss'
import { OptionButton } from "./OptionButton"
// importar contexto

export function SearchButton(props) {

  return (
    <div className='searchButton'>
      <OptionButton description={props.description}></OptionButton>
    </div>
  )
}