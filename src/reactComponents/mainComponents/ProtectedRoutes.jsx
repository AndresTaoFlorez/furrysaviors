import { Navigate, Outlet } from 'react-router-dom';

/**
 * Componente que protege las rutas.
 * @param {JSX.Element} children - Elemento JSX que se protege.
 * @param {Array} allowedRoles - Array de roles permitidos.
 * @returns {JSX.Element} - Elemento JSX que protege las rutas.
 */
const ProtectedRoutes = ({ userSession, children, allowedRoles = [] }) => {

  const isAuthorized = userSession?.user?.role?.split(',').some(role => allowedRoles.includes(role.trim()));

  if (!isAuthorized) {
    return <Navigate to="/home" />;
  }

  return children || <Outlet />;
};

export default ProtectedRoutes;