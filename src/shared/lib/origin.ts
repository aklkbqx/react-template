export function parseOrigin(value?: string) {
  if (!value) return null;

  try {
    return new URL(value);
  } catch {
    return null;
  }
}

export function parseOrigins(value?: string) {
  if (!value) return [];

  return value
    .split(',')
    .map((entry) => parseOrigin(entry.trim()))
    .filter((entry): entry is URL => Boolean(entry));
}

export function collectAllowedHostnames(values: Array<string | undefined>) {
  const hostnames = new Set<string>();

  for (const value of values) {
    for (const origin of parseOrigins(value)) {
      hostnames.add(origin.hostname.toLowerCase());
    }
  }

  return hostnames.size > 0 ? Array.from(hostnames) : true;
}

export function isSameOrigin(left: URL, right: URL) {
  return left.origin.toLowerCase() === right.origin.toLowerCase();
}

export function hasMatchingHostname(current: URL, origins: URL[]) {
  return origins.some((origin) => origin.hostname.toLowerCase() === current.hostname.toLowerCase());
}
