import { lazy } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

const Creators = lazy(() => import('./pages/creators'));

const CreatorsRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Outlet />}>
        <Route path="" element={<Creators />} />
      </Route>
    </Routes>
  );
};

export default CreatorsRoutes;
