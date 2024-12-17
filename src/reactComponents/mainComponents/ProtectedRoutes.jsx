import { Navigate, Outlet } from 'react-router-dom';
import { isNil } from 'lodash'
import { Loading } from '../../reactComponents/moreComponents/Loading';
import { checkSessionService } from '../../services.js/login';
import { isBad } from '../../services.js/dataVerify';

/**
 * Componente que protege las rutas.
 * @param {boolean} props.isLoading - Indica si la sesión aún se está verificando.
 * @param {Array} props.allowedRoles - Array de roles permitidos.
 * @returns {JSX.Element} - Elemento JSX que protege las rutas.
 */
const ProtectedRoutes = ({ isLoading, children, allowedRoles = [] }) => {
  if (isLoading) return <Loading>Cargando...</Loading>; // Mostrar pantalla de carga

  const verifyUserRole = () => {
    const sessionService = checkSessionService()
    if (isBad(sessionService, sessionService)) return false
    const user = sessionService.user
    // console.log(user);

    const userRoles = user.role.split(',').map(role => role.trim());

    const isAuthorized = userRoles.some(role => allowedRoles.includes(role));
    return isNil(isAuthorized) ? false : true
  }

  if (verifyUserRole()) return children || <Outlet />
  return <Navigate to="/home"></Navigate>;
};

export default ProtectedRoutes;

