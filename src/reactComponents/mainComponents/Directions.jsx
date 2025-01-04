// src/reactComponents/mainComponents/Directions.jsx
import { GlobalContext } from '../context/GlobalContext';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import ContentBody from './ContentBody';
import { Option1 } from '../moreComponents/Option1';
import { Option2 } from '../moreComponents/Option2';
import { Option3 } from '../moreComponents/Option3';
import ProtectedRoutes from './ProtectedRoutes';
import { isBad } from '../../services.js/dataVerify';
import { checkSessionService, getCurrentUrl, setUrlFromServer } from '../../services.js/login';
import { useConfigContext } from '../customHooks/useConfigContext';

export function Directions() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userSession, isLoading, menuOptions, currentUrl, setCurrentUrl, setConfig, setUserSession } = useContext(GlobalContext);
  const { updateAllConfigData } = useConfigContext({ menuOptions, setUserSession, setConfig, navigate })

  useEffect(() => {
    const userData = checkSessionService()
    if (isBad(userData, { secondLeve: true })) return
    setCurrentUrl(location.pathname);
  }, [location.pathname]); // Escuchar cambios en token y pathname


  // validar con el checkSessioniService en lugar del userSession
  useEffect(() => {
    const userData = checkSessionService()
    if (isBad(userData, { secondLeve: true })) return
    const serverUrl = userData.user.config.currentUrl
    const userFromServer = getCurrentUrl()
    if (isBad(userFromServer)) {
      setUrlFromServer({ url: serverUrl })
      navigate(serverUrl)
      // console.log('logged: ', serverUrl);
      return
    } else {
      if (location.pathname) {
        if (currentUrl === '/home' || currentUrl === null) {
          navigate(location.pathname)
          updateAllConfigData({ newUrl: location.pathname, oldUrl: currentUrl })
        }
      }
    }

    // console.log(`different to ${userData.user.config.currentUrl} from server`);
  }, [currentUrl, userSession?.token])

  return (
    <Routes>
      <Route index element={<ContentBody />} />
      <Route path={menuOptions?.option0} element={<ContentBody />} />

      {/* Protected routes for admin */}
      <Route element={<ProtectedRoutes userSession={userSession} isLoading={isLoading} allowedRoles={['admin']} />}>
        <Route path={menuOptions?.option1} element={<Option1 />} />
        <Route path={menuOptions?.option3} element={<Option3 />} />
      </Route>

      {/* Protected routes for admin and user */}
      <Route element={<ProtectedRoutes userSession={userSession} isLoading={isLoading} allowedRoles={['admin', 'user']} />}>
        <Route path={menuOptions?.option2} element={<Option2 />} />
      </Route>

      {/* Redirect for any unmatched route */}
      <Route path="*" element={<Navigate to={menuOptions?.option0} />} />
    </Routes>
  );
}
