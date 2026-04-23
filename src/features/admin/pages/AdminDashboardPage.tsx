import { Chip } from '@heroui/react';
import { AdminSummaryGrid } from '@/features/admin/components/AdminSummaryGrid';
import { PageHeader } from '@/shared/ui/PageHeader';
import { PanelCard } from '@/shared/ui/PanelCard';
import { PlaceholderTable } from '@/shared/ui/PlaceholderTable';

export function AdminDashboardPage() {
  return (
    <div className="space-y-6 text-slate-900">
      <PageHeader
        description="Generic admin overview page for the new project structure. Replace cards, charts, and table modules with real back-office features later."
        eyebrow="Admin dashboard"
        title="Admin project shell"
      />

      <AdminSummaryGrid />

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <PanelCard
          description="Starter table to show where operational modules will be plugged in."
          title="Placeholder modules"
        >
          <PlaceholderTable />
        </PanelCard>

        <PanelCard
          description="A small example of stateful setup components using HeroUI."
          title="Environment controls"
        >
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div>
                <p className="font-medium">Maintenance mode</p>
                <p className="text-sm text-slate-500">Starter-only toggle for future system settings.</p>
              </div>
            </div>

            <Chip className="bg-emerald-100 text-emerald-700" variant="soft">
              Open for build-out
            </Chip>
          </div>
        </PanelCard>
      </div>
    </div>
  );
}
