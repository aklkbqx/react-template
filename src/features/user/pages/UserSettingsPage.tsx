import { PageHeader } from '@/shared/ui/PageHeader';
import { PanelCard } from '@/shared/ui/PanelCard';

export function UserSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        description="Placeholder user preferences page for the rebuilt starter project."
        eyebrow="User settings"
        title="Preferences shell"
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <PanelCard title="User preferences">
          <div className="space-y-4">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Preferred language</span>
              <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none">
                <option>English</option>
                <option>Thai</option>
              </select>
            </label>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              Alternate themes should be added after the final user design system is defined.
            </div>
          </div>
        </PanelCard>

        <PanelCard title="Migration notes">
          <ul className="space-y-3 text-sm text-slate-600">
            <li>User starter pages are intentionally generic and business-neutral.</li>
            <li>Add real settings contracts only after user feature requirements are finalized.</li>
            <li>Keep future shared logic in `shared/lib` and user-specific logic in `features/user`.</li>
          </ul>
        </PanelCard>
      </div>
    </div>
  );
}
