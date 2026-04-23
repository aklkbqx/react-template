import { createAppConfig } from './vite.shared';

export default ({ mode }: { mode: string }) => createAppConfig({ appVariant: 'admin', mode });
