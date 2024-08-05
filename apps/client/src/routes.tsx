import { lazy } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/modules/auth/contexts';

const AuthenticationRoutes = lazy(() => import('@/modules/auth/routes'))
const DashboardRoutes = lazy(() => import('@/modules/dashboard/routes'))

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<AuthProvider><Outlet /></AuthProvider>}>
        <Route path="auth/*" element={<AuthenticationRoutes />} />
        <Route path="dashboard/*" element={<DashboardRoutes />} />
      
        <Route path="" element={<Navigate to="/auth" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
