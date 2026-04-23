import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nProvider } from '@heroui/react';
import { useState, type PropsWithChildren } from 'react';
import { StarterAuthProvider } from '@/app/providers/StarterAuthProvider';
import { StarterSocketProvider } from '@/app/providers/StarterSocketProvider';
import '@/app/providers/i18n';

export function AppProviders({ children }: PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider locale="en-US">
        <StarterSocketProvider>
          <StarterAuthProvider>{children}</StarterAuthProvider>
        </StarterSocketProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}
