import { Input } from '@heroui/react';
import { useState } from 'react';
import { PageHeader } from '@/shared/ui/PageHeader';
import { PanelCard } from '@/shared/ui/PanelCard';

export function AdminSettingsPage() {
  const [apiBaseUrl, setApiBaseUrl] = useState(import.meta.env.VITE_API_BASE_URL?.trim() || '/api');

  return (
    <div className="space-y-6 text-slate-900">
      <PageHeader
        description="Placeholder system settings page for the rebuilt admin starter."
        eyebrow="Admin settings"
        title="Project configuration shell"
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <PanelCard title="Runtime defaults">
          <div className="space-y-4">
            <label className="space-y-2">
              <span className="text-sm font-medium">API base URL</span>
              <Input
                aria-label="API base URL"
                value={apiBaseUrl}
                onChange={(event) => setApiBaseUrl(event.target.value)}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium">Target environment</span>
              <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none">
                <option>development</option>
                <option>staging</option>
                <option>production</option>
              </select>
            </label>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              Starter notifications are intentionally left as a future module in the rebuilt setup.
            </div>
          </div>
        </PanelCard>

        <PanelCard title="Migration notes">
          <ul className="space-y-3 text-sm text-slate-600">
            <li>Old Ant Design wrappers were removed from the active project surface.</li>
            <li>Shared UI now belongs in `src/shared/ui` and should stay generic.</li>
            <li>Admin-specific service contracts should live inside `features/admin/services`.</li>
          </ul>
        </PanelCard>
      </div>
    </div>
  );
}
