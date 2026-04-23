import { Button } from '@heroui/react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/shared/ui/PageHeader';

export function UserNotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <PageHeader
        description="The requested user page does not exist in the new starter structure."
        eyebrow="User"
        title="Page not found"
      />
      <Button className="bg-blue-600 text-white" onPress={() => navigate('/')}>
        Return to user dashboard
      </Button>
    </div>
  );
}
