import type { AppVariant } from '@/app/runtime/app-variant';
import {
  hasMatchingHostname,
  isSameOrigin,
  parseOrigin,
  parseOrigins,
} from '@/shared/lib/origin';

type RedirectConfig = {
  adminAllowedOrigins: URL[];
  adminOrigin: URL;
  siteAllowedOrigins: URL[];
};

type RedirectContext = {
  current: URL;
  hasLegacyAdminPrefix: boolean;
  isAdminOnlyHostname: boolean;
  isAdminOrigin: boolean;
  normalizedAdminPath: string;
};

type RedirectDecision = (context: RedirectContext) => string | null;

function withOrigin(targetOrigin: URL | string, current: URL, pathname = current.pathname) {
  const next = new URL(targetOrigin.toString());
  next.pathname = pathname;
  next.search = current.search;
  next.hash = current.hash;
  return next.toString();
}

function findMatchingOriginByHostname(current: URL, origins: URL[]) {
  return origins.find((origin) => origin.hostname.toLowerCase() === current.hostname.toLowerCase()) || null;
}

function findMatchingOriginByLoopbackFamily(current: URL, origins: URL[]) {
  const currentHostname = current.hostname.toLowerCase();
  const isLoopback =
    currentHostname === 'localhost' ||
    currentHostname === '127.0.0.1' ||
    currentHostname.endsWith('.localhost');

  if (!isLoopback) return null;

  return (
    origins.find((origin) => {
      const hostname = origin.hostname.toLowerCase();
      return hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.localhost');
    }) || null
  );
}

function resolveTargetOrigin(current: URL, preferredOrigin: URL, allowedOrigins: URL[]) {
  return (
    findMatchingOriginByHostname(current, allowedOrigins) ||
    findMatchingOriginByLoopbackFamily(current, allowedOrigins) ||
    preferredOrigin
  );
}

function buildRedirectConfig() {
  const siteOrigin = parseOrigin(import.meta.env.VITE_SITE_ORIGIN);
  const adminOrigin = parseOrigin(import.meta.env.VITE_ADMIN_ORIGIN);
  if (!siteOrigin || !adminOrigin) {
    return null;
  }

  return {
    adminAllowedOrigins: parseOrigins(import.meta.env.VITE_ADMIN_ALLOWED_ORIGINS).concat(adminOrigin),
    adminOrigin,
    siteAllowedOrigins: parseOrigins(import.meta.env.VITE_SITE_ALLOWED_ORIGINS).concat(siteOrigin),
  } satisfies RedirectConfig;
}

function getAdminRedirect(current: URL, pathname: string, config: RedirectConfig) {
  return withOrigin(
    resolveTargetOrigin(current, config.adminOrigin, config.adminAllowedOrigins),
    current,
    pathname,
  );
}

function buildRedirectContext(current: URL, config: RedirectConfig): RedirectContext {
  const currentOrigin = new URL(current.origin);
  const isAdminOrigin = config.adminAllowedOrigins.some((origin) => isSameOrigin(currentOrigin, origin));
  const matchesAdminHostname = hasMatchingHostname(current, config.adminAllowedOrigins);
  const matchesSiteHostname = hasMatchingHostname(current, config.siteAllowedOrigins);
  const hasLegacyAdminPrefix =
    current.pathname === '/admin' || current.pathname.startsWith('/admin/');

  return {
    current,
    hasLegacyAdminPrefix,
    isAdminOnlyHostname: matchesAdminHostname && !matchesSiteHostname,
    isAdminOrigin,
    normalizedAdminPath: hasLegacyAdminPrefix
      ? current.pathname.replace(/^\/admin(?=\/|$)/, '') || '/'
      : current.pathname,
  };
}

const redirectPolicies: Record<AppVariant, RedirectDecision> = {
  site: ({ hasLegacyAdminPrefix, isAdminOnlyHostname, isAdminOrigin, normalizedAdminPath }) => {
    if (isAdminOnlyHostname || isAdminOrigin || hasLegacyAdminPrefix) {
      return normalizedAdminPath;
    }

    return null;
  },
  admin: ({ isAdminOrigin, normalizedAdminPath }) => {
    if (isAdminOrigin) {
      return null;
    }

    return normalizedAdminPath;
  },
};

export function resolveAppRedirect(appVariant: AppVariant, href: string) {
  const current = new URL(href);
  const config = buildRedirectConfig();
  if (!config) {
    return null;
  }

  const context = buildRedirectContext(current, config);
  const redirectPath = redirectPolicies[appVariant](context);
  if (!redirectPath) {
    return null;
  }

  return getAdminRedirect(current, redirectPath, config);
}
