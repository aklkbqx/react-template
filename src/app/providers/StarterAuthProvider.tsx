import { useMemo, useState, type PropsWithChildren } from 'react';
import {
  StarterAuthContext,
  type AppRole,
  type SessionRecord,
  type StarterAuthContextValue,
} from '@/app/providers/starter-auth-context';

const storageKey = 'starter-auth-sessions';

const defaultSessions: Record<AppRole, SessionRecord> = {
  admin: { email: 'admin@example.com', loggedIn: false, role: 'admin' },
  user: { email: 'user@example.com', loggedIn: false, role: 'user' },
};

function readSessions(): Record<AppRole, SessionRecord> {
  if (typeof window === 'undefined') {
    return defaultSessions;
  }

  const saved = window.localStorage.getItem(storageKey);
  if (!saved) {
    return defaultSessions;
  }

  try {
    const parsed = JSON.parse(saved) as Partial<Record<AppRole, Partial<SessionRecord>>>;

    return {
      admin: {
        ...defaultSessions.admin,
        ...parsed.admin,
        role: 'admin',
      },
      user: {
        ...defaultSessions.user,
        ...parsed.user,
        role: 'user',
      },
    };
  } catch {
    return defaultSessions;
  }
}

export function StarterAuthProvider({ children }: PropsWithChildren) {
  const [sessions, setSessions] = useState<Record<AppRole, SessionRecord>>(() => readSessions());

  const value = useMemo<StarterAuthContextValue>(
    () => ({
      getSession: (role) => sessions[role],
      login: (role, email) => {
        setSessions((current) => {
          const next = {
            ...current,
            [role]: {
              email: email.trim() || defaultSessions[role].email,
              loggedIn: true,
              role,
            },
          };

          if (typeof window !== 'undefined') {
            window.localStorage.setItem(storageKey, JSON.stringify(next));
          }

          return next;
        });
      },
      logout: (role) => {
        setSessions((current) => {
          const next = {
            ...current,
            [role]: {
              ...defaultSessions[role],
              loggedIn: false,
            },
          };

          if (typeof window !== 'undefined') {
            window.localStorage.setItem(storageKey, JSON.stringify(next));
          }

          return next;
        });
      },
    }),
    [sessions],
  );

  return <StarterAuthContext.Provider value={value}>{children}</StarterAuthContext.Provider>;
}
