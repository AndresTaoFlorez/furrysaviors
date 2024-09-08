import '../../style/mainComponentsStyle/App.scss'
import Navbar from './Navbar'
import ContentBody from './ContentBody'
import Footer from './Footer'
// import { Routes, Route } from 'react-router-dom';
// import { Option1 } from '../components/Option1'
import { NavbarProvider } from '../context/NavbarContext'

export default function App() {
  return (<>
    <div className="App">
      <NavbarProvider>
        <Navbar />
        {/* <Routes>
          <Route path="/Option1" element={<Option1 />} />
          <Route path='/' element={<ContentBody />}></Route>
        </Routes> */}
        <ContentBody/>
      </NavbarProvider>
      <Footer></Footer>
    </div>
  </>)
}