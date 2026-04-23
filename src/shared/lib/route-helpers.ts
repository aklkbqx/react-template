export function isPathActive(currentPath: string, href: string) {
  if (href === currentPath) {
    return true;
  }

  return href !== '/' && currentPath.startsWith(`${href}/`);
}
