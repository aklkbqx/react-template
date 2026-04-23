import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useStarterAuth } from '@/app/providers/starter-auth-context';
import { AdminLayout } from '@/features/admin/layouts/AdminLayout';
import { AdminDashboardPage } from '@/features/admin/pages/AdminDashboardPage';
import { AdminLoginPage } from '@/features/admin/pages/AdminLoginPage';
import { AdminNotFoundPage } from '@/features/admin/pages/AdminNotFoundPage';
import { AdminSettingsPage } from '@/features/admin/pages/AdminSettingsPage';

export function AdminRoutes() {
  const { getSession } = useStarterAuth();
  const location = useLocation();
  const session = getSession('admin');

  if (!session.loggedIn && location.pathname === '/') {
    return <Navigate to="/login" replace />;
  }

  if (session.loggedIn && location.pathname === '/login') {
    return <Navigate to="/" replace />;
  }

  return (
    <Routes>
      <Route path="login" element={<AdminLoginPage />} />
      <Route element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
        <Route path="not-found" element={<AdminNotFoundPage />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Route>
    </Routes>
  );
}
