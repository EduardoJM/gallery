import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './layouts';

/*
const UserRoutes = lazy(() => import('@/modules/users/routes'));
const CallLogsRoutes = lazy(() => import('@/modules/ai-call-logs/routes'));
const AIProviderRoutes = lazy(() => import('@/modules/ai-providers/routes'));
const AIPromptTemplatesRoutes = lazy(() => import('@/modules/ai-prompt-templates/routes'));
const DatabasesRoutes = lazy(() => import('@/modules/databases/routes'));
const DepartamentsRoutes = lazy(() => import('@/modules/departaments/routes'));
const ChatExampleRoutes = lazy(() => import('@/modules/ai-chat-examples/routes'));
const LDAPRoutes = lazy(() => import('@/modules/ldap/routes'));

const Errors = lazy(() => import('./pages/errors'));
const Accesses = lazy(() => import('./pages/accesses'));
const Unlike = lazy(() => import('./pages/unlike'));
const Like = lazy(() => import('./pages/like'));
*/

const Gallery = lazy(() => import('@/modules/gallery/routes'));
const Creators = lazy(() => import('@/modules/creator/routes'));

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<DashboardLayout />}>
        <Route path="" element={<Navigate to="/dashboard/gallery" replace />} />
        
        <Route path="gallery/*" element={<Gallery />} />
        <Route path="creators/*" element={<Creators />} />
        {/*
        <Route path="ai-providers/*" element={<AIProviderRoutes />} />
        <Route path="ai-prompt-templates/*" element={<AIPromptTemplatesRoutes />} />
        <Route path="ai-chat-examples/*" element={<ChatExampleRoutes />} />
        <Route path="call-logs/*" element={<CallLogsRoutes />} />
        <Route path="databases/*" element={<DatabasesRoutes />} />
        <Route path="departaments/*" element={<DepartamentsRoutes />} />
        <Route path="ldap/*" element={<LDAPRoutes />} />
        */}
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
