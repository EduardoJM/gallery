import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Gallery = lazy(() => import('./pages/gallery'));

const GalleryRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Gallery />} />
    </Routes>
  );
};

export default GalleryRoutes;
