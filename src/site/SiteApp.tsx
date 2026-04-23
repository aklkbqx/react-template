import { BrowserRouter } from 'react-router-dom';
import { UserRoutes } from '@/features/user/routes/UserRoutes';

export function SiteApp() {
  return (
    <BrowserRouter>
      <UserRoutes />
    </BrowserRouter>
  );
}
