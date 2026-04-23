import { createContext, useContext } from 'react';

type StarterSocketContextValue = {
  connected: boolean;
  statusLabel: string;
};

const StarterSocketContext = createContext<StarterSocketContextValue | null>(null);

export function useStarterSocket() {
  const context = useContext(StarterSocketContext);

  if (!context) {
    throw new Error('useStarterSocket must be used within StarterSocketProvider');
  }

  return context;
}

export { StarterSocketContext };
export type { StarterSocketContextValue };
