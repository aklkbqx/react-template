import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProviders } from '@/app/providers/AppProviders';
import { getAppVariant } from '@/app/runtime/app-variant';
import { resolveAppRedirect } from '@/app/runtime/redirect';
import { AdminApp } from '@/admin/AdminApp';
import { SiteApp } from '@/site/SiteApp';
import '@/index.css';

export function bootstrapApp() {
  const appVariant = getAppVariant();
  const App = appVariant === 'admin' ? AdminApp : SiteApp;
  const redirectTarget =
    typeof window === 'undefined' ? null : resolveAppRedirect(appVariant, window.location.href);

  if (typeof window !== 'undefined' && redirectTarget && redirectTarget !== window.location.href) {
    window.location.replace(redirectTarget);
    return;
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </StrictMode>,
  );
}

bootstrapApp();
