import { Button, Card, CardContent, Input } from '@heroui/react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStarterAuth } from '@/app/providers/starter-auth-context';
import { AppBrand } from '@/shared/ui/AppBrand';

export function UserLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useStarterAuth();
  const [email, setEmail] = useState('user@example.com');
  const nextPath = (location.state as { from?: string } | null)?.from || '/';

  return (
    <main className="user-surface flex min-h-screen items-center justify-center px-4 py-10 text-slate-900">
      <div className="grid w-full max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[2rem] border border-slate-200 bg-white/80 p-8 shadow-2xl backdrop-blur">
          <AppBrand accent="user" subtitle="User setup" title="Member-facing starter shell" />
          <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600">
            The user side now ships as a clean project setup with routing, layout, authentication
            shell, and reusable HeroUI components ready for the next product scope.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
              <p className="font-medium text-slate-950">Structure</p>
              <div className="mt-3 space-y-2">
                <p>`features/user` owns member routes, layouts, pages, and future feature modules.</p>
                <p>Shared providers keep the stack ready without business-specific wiring.</p>
                <p>Tailwind handles layout and tokens, while HeroUI provides form and surface primitives.</p>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
              <p className="font-medium text-slate-950">Next steps</p>
              <div className="mt-3 space-y-2">
                <p>Add profile, onboarding, and transactional modules under `features/user`.</p>
                <p>Connect real session and profile APIs through the shared axios client.</p>
                <p>Replace placeholders only when the new user journeys are finalized.</p>
              </div>
            </div>
          </div>
        </section>

        <Card className="border border-slate-200 bg-white text-slate-900 shadow-2xl">
          <CardContent className="gap-5 p-8">
            <div>
              <p className="text-sm text-slate-500">Starter login</p>
              <h2 className="text-2xl font-semibold">User access</h2>
            </div>

            <label className="space-y-2">
              <span className="text-sm text-slate-600">Email</span>
              <Input
                aria-label="User email"
                placeholder="user@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <span className="block text-xs text-slate-500">
                Stored in local storage for starter-only routing.
              </span>
            </label>

            <Button
              className="bg-blue-600 text-white"
              onPress={() => {
                login('user', email);
                navigate(nextPath, { replace: true });
              }}
            >
              Enter user starter
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
