import React from "react";
import { GlobalContextProvider } from "../context/GlobalContext.jsx";
import App from "../mainComponents/App.jsx";
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </React.Fragment>
);

