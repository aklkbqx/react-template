import { createAppConfig } from './vite.shared';

export default ({ mode }: { mode: string }) => createAppConfig({ appVariant: 'site', mode });
