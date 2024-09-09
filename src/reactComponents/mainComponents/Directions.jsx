// src/reactComponents/mainComponents/Directions.jsx
import { Routes, Route } from 'react-router-dom';
import ContentBody from './ContentBody';
import { Option1 } from '../moreComponents/Option1';
import { Option2 } from '../moreComponents/Option2';

export function Directions() {
  return (
    // Definición de las rutas
    <Routes>
      <Route path="/" element={<ContentBody />} />
      <Route path="/home" element={<ContentBody />} />
      <Route path="/option1" element={<Option1 />} />
      <Route path="/option2" element={<Option2 />} />
      <Route path="/option3" element="{<Option3 />}" />
    </Routes>
  );
}
