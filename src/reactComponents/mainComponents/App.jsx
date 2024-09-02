import '../../style/mainComponentsStyle/App.scss'
import Navbar from './Navbar'
import ContentBody from './ContentBody'
import Footer from './Footer'
import { NavbarProvider } from '../context/NavbarContext'

export default function App() {
  return (<>
    <div className="App">
      <NavbarProvider>
        <Navbar/>
        <ContentBody/>
      </NavbarProvider>
      <Footer></Footer>
    </div>
  </>)
}