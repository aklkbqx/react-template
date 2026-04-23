import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useStarterAuth } from '@/app/providers/starter-auth-context';
import { userNavigation } from '@/features/user/config/navigation';
import { ShellLayout } from '@/shared/ui/ShellLayout';

export function UserLayout() {
  const { getSession, logout } = useStarterAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const session = getSession('user');

  if (!session.loggedIn) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return (
    <ShellLayout
      accountLabel={session.email}
      mode="user"
      navigation={userNavigation.filter((item) => item.href !== '/login')}
      onLogout={() => {
        logout('user');
        navigate('/login');
      }}
      title="User starter"
    >
      <Outlet />
    </ShellLayout>
  );
}
