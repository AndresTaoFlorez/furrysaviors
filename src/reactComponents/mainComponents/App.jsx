import '../../style/mainComponentsStyle/App.scss';
import Navbar from './Navbar';
import Footer from './Footer';
import { Directions } from './Directions';
import { HashRouter } from 'react-router-dom';
import { NavbarProvider } from '../context/NavbarContext';


export default function App() {
  return (
    <HashRouter basename={process.env.NODE_ENV === 'development' ? '' : 'furrysaviors'}>
      <div className="App">
        <NavbarProvider>
          {/* Navbar siempre visible */}
          <Navbar />
          <Directions />
          <Footer />
        </NavbarProvider>
      </div>
    </HashRouter>
  );
}
