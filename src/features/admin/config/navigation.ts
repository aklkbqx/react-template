import { FiGrid, FiSettings, FiShield } from 'react-icons/fi';
import type { NavigationItem } from '@/shared/types/navigation';

export const adminNavigation: NavigationItem[] = [
  {
    href: '/',
    icon: FiGrid,
    label: 'Dashboard',
    description: 'Admin project shell and starter modules',
  },
  {
    href: '/settings',
    icon: FiSettings,
    label: 'Settings',
    description: 'Generic system preferences and placeholders',
  },
  {
    href: '/login',
    icon: FiShield,
    label: 'Login',
    description: 'Starter authentication screen for admin flows',
  },
];
