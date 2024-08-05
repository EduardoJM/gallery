import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthenticationLayout } from './layouts/authentication-layout';

const Login = lazy(() => import('./pages/login'));

const AuthenticationRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<AuthenticationLayout />}>
        <Route path="login" element={<Login />} />

        <Route path="" element={<Navigate to="/auth/login" replace />} />
      </Route>
    </Routes>
  );
};

export default AuthenticationRoutes;
