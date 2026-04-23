import { createContext, useContext } from 'react';

type AppRole = 'admin' | 'user';

type SessionRecord = {
  email: string;
  loggedIn: boolean;
  role: AppRole;
};

type StarterAuthContextValue = {
  getSession: (role: AppRole) => SessionRecord;
  login: (role: AppRole, email: string) => void;
  logout: (role: AppRole) => void;
};

const StarterAuthContext = createContext<StarterAuthContextValue | null>(null);

export function useStarterAuth() {
  const context = useContext(StarterAuthContext);

  if (!context) {
    throw new Error('useStarterAuth must be used within StarterAuthProvider');
  }

  return context;
}

export { StarterAuthContext };
export type { AppRole, SessionRecord, StarterAuthContextValue };
