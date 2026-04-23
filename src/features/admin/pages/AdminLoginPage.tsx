import { Button, Card, CardContent, Input } from '@heroui/react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStarterAuth } from '@/app/providers/starter-auth-context';
import { AppBrand } from '@/shared/ui/AppBrand';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useStarterAuth();
  const [email, setEmail] = useState('admin@example.com');
  const nextPath = (location.state as { from?: string } | null)?.from || '/';

  return (
    <main className="admin-surface flex min-h-screen items-center justify-center px-4 py-10 text-slate-100">
      <div className="grid w-full max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-8 shadow-2xl backdrop-blur">
          <AppBrand accent="admin" subtitle="Admin setup" title="Back-office starter shell" />
          <p className="mt-6 max-w-xl text-sm leading-7 text-slate-300">
            This admin side is now a clean starter. Old dashboard modules were removed and replaced
            with generic layouts, route guards, and HeroUI-based placeholders.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300">
              <p className="font-medium text-white">Structure</p>
              <div className="mt-3 space-y-2">
                <p>`features/admin` owns admin routes, layouts, pages, and feature modules.</p>
                <p>`shared/ui` contains reusable HeroUI and Tailwind primitives.</p>
                <p>`app/providers` owns auth shell, query client, i18n, and socket starter wiring.</p>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300">
              <p className="font-medium text-white">Next steps</p>
              <div className="mt-3 space-y-2">
                <p>Add real auth/API contracts into `features/admin/services`.</p>
                <p>Replace placeholder metrics and table rows with live queries.</p>
                <p>Extend navigation only when the new back-office scope is defined.</p>
              </div>
            </div>
          </div>
        </section>

        <Card className="border border-white/10 bg-slate-900/80 text-slate-100 shadow-2xl">
          <CardContent className="gap-5 p-8">
            <div>
              <p className="text-sm text-slate-400">Starter login</p>
              <h2 className="text-2xl font-semibold">Admin access</h2>
            </div>

            <label className="space-y-2">
              <span className="text-sm text-slate-300">Email</span>
              <Input
                aria-label="Admin email"
                placeholder="admin@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <span className="block text-xs text-slate-400">
                Stored in local storage for starter-only routing.
              </span>
            </label>

            <Button
              className="bg-teal-500 font-medium text-slate-950"
              onPress={() => {
                login('admin', email);
                navigate(nextPath, { replace: true });
              }}
            >
              Enter admin starter
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
