import { useMemo, type PropsWithChildren } from 'react';
import {
  StarterSocketContext,
  type StarterSocketContextValue,
} from '@/app/providers/starter-socket-context';

export function StarterSocketProvider({ children }: PropsWithChildren) {
  const value = useMemo<StarterSocketContextValue>(
    () => ({
      connected: false,
      statusLabel: 'Socket disabled in starter mode',
    }),
    [],
  );

  return <StarterSocketContext.Provider value={value}>{children}</StarterSocketContext.Provider>;
}
