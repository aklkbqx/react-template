import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useStarterAuth } from '@/app/providers/starter-auth-context';
import { adminNavigation } from '@/features/admin/config/navigation';
import { ShellLayout } from '@/shared/ui/ShellLayout';

export function AdminLayout() {
  const { getSession, logout } = useStarterAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const session = getSession('admin');

  if (!session.loggedIn) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return (
    <ShellLayout
      accountLabel={session.email}
      mode="admin"
      navigation={adminNavigation.filter((item) => item.href !== '/login')}
      onLogout={() => {
        logout('admin');
        navigate('/login');
      }}
      title="Admin starter"
    >
      <Outlet />
    </ShellLayout>
  );
}
