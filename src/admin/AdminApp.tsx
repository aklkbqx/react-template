import { BrowserRouter } from 'react-router-dom';
import { AdminRoutes } from '@/features/admin/routes/AdminRoutes';

export function AdminApp() {
  return (
    <BrowserRouter>
      <AdminRoutes />
    </BrowserRouter>
  );
}
