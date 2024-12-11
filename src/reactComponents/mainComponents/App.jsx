import '../../style/mainComponentsStyle/App.scss';
import Navbar from './Navbar';
import Footer from './Footer';
import { Directions } from './Directions';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { NavbarProvider } from '../context/NavbarContext';
// import AppProviders from './AppProviders';


export default function App() {

  return (
    <>
      {process.env.NODE_ENV === 'development' ? (
        <BrowserRouter basename="/furrysaviors">
          <div className="App">
            <NavbarProvider>
              <Navbar />
              <Directions />
              <Footer />
            </NavbarProvider>
          </div>
        </BrowserRouter>
      ) : (
        <HashRouter>
          <div className="App">
            <NavbarProvider>
              <Navbar />
              <Directions />
              <Footer />
            </NavbarProvider>
          </div>
        </HashRouter>
      )
      }
    </>
  );
}
