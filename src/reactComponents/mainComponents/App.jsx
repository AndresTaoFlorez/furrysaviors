import '../../style/mainComponentsStyle/App.scss';
import Navbar from './Navbar';
import Footer from './Footer';
import { Directions } from './Directions';
import { BrowserRouter } from 'react-router-dom';
import { NavbarProvider } from '../context/NavbarContext';


export default function App() {
  return (
    <BrowserRouter basename={process.env.NODE_ENV === 'development' ? '/furrysaviors' : '#'}>
      <div className="App">
        <NavbarProvider>
          {/* Navbar siempre visible */}
          <Navbar />
          <Directions />
          <Footer />
        </NavbarProvider>
      </div>
    </BrowserRouter>
  );
}
