import { Input, TextArea } from '@heroui/react';
import { useState } from 'react';
import { UserSummaryGrid } from '@/features/user/components/UserSummaryGrid';
import { PageHeader } from '@/shared/ui/PageHeader';
import { PanelCard } from '@/shared/ui/PanelCard';

export function UserDashboardPage() {
  const [notes, setNotes] = useState('');
  return (
    <div className="space-y-6">
      <PageHeader
        description="Generic user dashboard placeholder. Use this surface for onboarding, profile, wallet, or engagement flows when the new product requirements are ready."
        eyebrow="User dashboard"
        title="User project shell"
      />

      <UserSummaryGrid />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <PanelCard
          description="Starter form controls built with HeroUI and Tailwind."
          title="Profile placeholder"
        >
          <div className="space-y-4">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Display name</span>
              <Input aria-label="Display name" placeholder="Starter User" />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Notes</span>
              <TextArea
                aria-label="Notes"
                placeholder="Add future product notes or onboarding copy here."
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
              />
            </label>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              Release notifications and preference toggles should be added as real modules later.
            </div>
          </div>
        </PanelCard>

        <PanelCard
          description="Suggested area for future user-specific modules."
          title="Next modules"
        >
          <ul className="space-y-3 text-sm text-slate-600">
            <li>Profile and account management</li>
            <li>Transactional or activity history</li>
            <li>Notification center and support entry points</li>
            <li>Personalized onboarding and member dashboards</li>
          </ul>
        </PanelCard>
      </div>
    </div>
  );
}
