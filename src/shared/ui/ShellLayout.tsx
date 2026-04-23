import { Button, Card, CardContent, Chip } from '@heroui/react';
import type { PropsWithChildren } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useStarterSocket } from '@/app/providers/starter-socket-context';
import { isPathActive } from '@/shared/lib/route-helpers';
import type { NavigationItem } from '@/shared/types/navigation';

type ShellLayoutProps = PropsWithChildren<{
  accountLabel: string;
  mode: 'admin' | 'user';
  navigation: NavigationItem[];
  onLogout: () => void;
  title: string;
}>;

export function ShellLayout({
  accountLabel,
  children,
  mode,
  navigation,
  onLogout,
  title,
}: ShellLayoutProps) {
  const location = useLocation();
  const socket = useStarterSocket();
  const wrapperClassName =
    mode === 'admin'
      ? 'admin-surface min-h-screen text-slate-100'
      : 'user-surface min-h-screen text-slate-900';
  const sidebarClassName =
    mode === 'admin'
      ? 'border-white/10 bg-slate-900/70 text-slate-100'
      : 'border-slate-200 bg-white/75 text-slate-900';
  const navActiveClassName =
    mode === 'admin'
      ? 'bg-teal-400/15 text-teal-200 border border-teal-400/20'
      : 'bg-blue-100 text-blue-700 border border-blue-200';
  const navIdleClassName =
    mode === 'admin'
      ? 'text-slate-300 hover:bg-white/5'
      : 'text-slate-600 hover:bg-slate-100';

  return (
    <div className={wrapperClassName}>
      <div className="mx-auto grid min-h-screen max-w-7xl gap-6 px-4 py-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className={`rounded-3xl border p-5 shadow-2xl backdrop-blur ${sidebarClassName}`}>
          <div className="space-y-6">
            <div className="space-y-3">
              <Chip
                className={
                  mode === 'admin'
                    ? 'border border-teal-400/20 bg-teal-400/10 text-teal-200'
                    : 'border border-blue-200 bg-blue-100 text-blue-700'
                }
                size="sm"
                variant="soft"
              >
                {mode === 'admin' ? 'Admin workspace' : 'User workspace'}
              </Chip>
              <div>
                <p className="text-sm text-current/60">{title}</p>
                <p className="text-lg font-semibold">{accountLabel}</p>
              </div>
            </div>

            <nav className="space-y-2">
              {navigation.map((item) => {
                const active = isPathActive(location.pathname, item.href);
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.href}
                    className={`flex items-start gap-3 rounded-2xl px-4 py-3 transition ${active ? navActiveClassName : navIdleClassName}`}
                    to={item.href}
                  >
                    <Icon className="mt-0.5 text-lg" />
                    <span className="block">
                      <span className="block font-medium">{item.label}</span>
                      <span className="block text-xs text-current/60">{item.description}</span>
                    </span>
                  </NavLink>
                );
              })}
            </nav>

            <Card className={mode === 'admin' ? 'bg-white/5 text-slate-100' : 'bg-slate-50'}>
              <CardContent className="gap-3">
                <div>
                  <p className="text-sm font-medium">Shared stack</p>
                  <p className="text-xs text-current/60">
                    React Router, React Query, Axios, i18n, and socket stub are wired in.
                  </p>
                </div>
                <p className="text-xs text-current/60">{socket.statusLabel}</p>
              </CardContent>
            </Card>

            <Button
              className={mode === 'admin' ? 'bg-teal-500 font-medium text-slate-950' : 'bg-blue-600 text-white'}
              onPress={onLogout}
            >
              Sign out starter session
            </Button>
          </div>
        </aside>

        <main className="flex min-h-[calc(100vh-2rem)] flex-col gap-6 rounded-3xl border border-white/10 bg-white/80 p-6 shadow-[0_30px_80px_-32px_rgba(15,23,42,0.45)] backdrop-blur lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
