import { GlobalContextProvider } from "../context/GlobalContext.jsx";
import App from "../mainComponents/App.jsx";

import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById("root"));
root.render(
  <GlobalContextProvider>
    <App />
  </GlobalContextProvider>
);
