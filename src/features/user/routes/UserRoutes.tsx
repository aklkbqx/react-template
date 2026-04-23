import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useStarterAuth } from '@/app/providers/starter-auth-context';
import { UserLayout } from '@/features/user/layouts/UserLayout';
import { UserDashboardPage } from '@/features/user/pages/UserDashboardPage';
import { UserLoginPage } from '@/features/user/pages/UserLoginPage';
import { UserNotFoundPage } from '@/features/user/pages/UserNotFoundPage';
import { UserSettingsPage } from '@/features/user/pages/UserSettingsPage';

export function UserRoutes() {
  const { getSession } = useStarterAuth();
  const location = useLocation();
  const session = getSession('user');

  if (!session.loggedIn && location.pathname === '/') {
    return <Navigate to="/login" replace />;
  }

  if (session.loggedIn && location.pathname === '/login') {
    return <Navigate to="/" replace />;
  }

  return (
    <Routes>
      <Route path="login" element={<UserLoginPage />} />
      <Route element={<UserLayout />}>
        <Route index element={<UserDashboardPage />} />
        <Route path="settings" element={<UserSettingsPage />} />
        <Route path="not-found" element={<UserNotFoundPage />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Route>
    </Routes>
  );
}
