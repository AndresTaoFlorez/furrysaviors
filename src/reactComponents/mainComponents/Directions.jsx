// src/reactComponents/mainComponents/Directions.jsx
import { GlobalContext } from '../context/GlobalContext';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import ContentBody from './ContentBody';
import { Option1 } from '../moreComponents/Option1';
import { Option2 } from '../moreComponents/Option2';
import { Option3 } from '../moreComponents/Option3';
import ProtectedRoutes from './ProtectedRoutes';
import { useConfigContext } from '../customHooks/useConfigContext';


export function Directions() {
  const navigate = useNavigate()
  const location = useLocation()
  const { userSession, isLoading } = useContext(GlobalContext);

  useConfigContext({ navigate, location })

  return (
    // Definición de las rutas
    <Routes>
      <Route index element={<ContentBody />} />
      <Route path="/home" element={<ContentBody />} />
      {/* Check if user exists and has roles */}
      <Route element={<ProtectedRoutes userSession={userSession} isLoading={isLoading} allowedRoles={['admin']} />}>
        <Route path="/option1" element={<Option1 />} />
        <Route path="/option3" element={<Option3 />} />
      </Route>
      <Route element={<ProtectedRoutes userSession={userSession} isLoading={isLoading} allowedRoles={['admin', 'user']} />}>
        <Route path="/option2" element={<Option2 />} />
      </Route>
      {/* Agregar ruta para manejar páginas no encontradas */}
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>


  );
}
