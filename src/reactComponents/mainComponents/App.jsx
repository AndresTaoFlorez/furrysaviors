import '../../style/mainComponentsStyle/App.scss';
import Navbar from './Navbar';
import Footer from './Footer';
import { Directions } from './Directions';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Loading } from '../../reactComponents/moreComponents/Loading'
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';


export default function App() {
  const { isLoading } = useContext(GlobalContext)

  return (
    <>
      {process.env.NODE_ENV === 'development' ? (
        <BrowserRouter basename="/furrysaviors">
          <div className="App">
            {(isLoading)
              ? <Loading>Cargando...</Loading>
              : <>
                <Navbar />
                <Directions />
                <Footer />
              </>
            }
          </div>
        </BrowserRouter>
      ) : (
        <HashRouter>
          <div className="App">
            <Navbar />
            <Directions />
            <Footer />
          </div>
        </HashRouter>
      )
      }
    </>
  );
}
