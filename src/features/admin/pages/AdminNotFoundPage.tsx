import { Button } from '@heroui/react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/shared/ui/PageHeader';

export function AdminNotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 text-slate-900">
      <PageHeader
        description="The requested admin page does not exist in the new starter structure."
        eyebrow="Admin"
        title="Page not found"
      />
      <Button className="bg-teal-500 font-medium text-slate-950" onPress={() => navigate('/')}>
        Return to admin dashboard
      </Button>
    </div>
  );
}
