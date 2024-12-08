import { Navigate, Outlet } from 'react-router-dom';

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

  const userRoles = userSession?.user?.role 
    ? userSession.user.role.split(',').map(role => role.trim()) 
    : [];

  const isAuthorized = userRoles.some(role => allowedRoles.includes(role));

  if (!isAuthorized) return <Navigate to="/home" />;

  return children || <Outlet />;
};

export default ProtectedRoutes;
