import { FiHome, FiSettings, FiUser } from 'react-icons/fi';
import type { NavigationItem } from '@/shared/types/navigation';

export const userNavigation: NavigationItem[] = [
  {
    href: '/',
    icon: FiHome,
    label: 'Dashboard',
    description: 'User-facing shell and overview placeholders',
  },
  {
    href: '/settings',
    icon: FiSettings,
    label: 'Settings',
    description: 'Profile, preferences, and module placeholders',
  },
  {
    href: '/login',
    icon: FiUser,
    label: 'Login',
    description: 'Starter authentication screen for user flows',
  },
];
