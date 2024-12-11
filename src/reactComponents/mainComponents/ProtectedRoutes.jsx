import { Navigate, Outlet } from 'react-router-dom';
import { isNil } from 'lodash'
import { checkSessionService } from '../../services.js/login';

/**
 * Componente que protege las rutas.
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.userSession - Información de la sesión del usuario.
 * @param {boolean} props.isLoading - Indica si la sesión aún se está verificando.
 * @param {JSX.Element} props.children - Elemento JSX que se protege.
 * @param {Array} props.allowedRoles - Array de roles permitidos.
 * @returns {JSX.Element} - Elemento JSX que protege las rutas.
 */
const ProtectedRoutes = ({ userSession, isLoading, children, allowedRoles = [] }) => {
  if (isLoading) return <div>Cargando...</div>; // Mostrar pantalla de carga

  const verifyUserRole = () => {
    const sessionService = checkSessionService()
    if (isNil(sessionService) || isNil(sessionService.user)) return false
    const user = sessionService.user
    const userRoles = user.role.split(',').map(role => role.trim());

    const isAuthorized = userRoles.some(role => allowedRoles.includes(role));
    return isNil(isAuthorized) ? false : true
  }
  
  if (verifyUserRole()) return children || <Outlet />
  return <Navigate to="/home"></Navigate>;
};

export default ProtectedRoutes;

