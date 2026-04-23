import { defineConfig, loadEnv, type UserConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { collectAllowedHostnames, parseOrigin } from './src/shared/lib/origin';

type AppVariant = 'site' | 'admin';

type CreateAppConfigOptions = {
  appVariant: AppVariant;
  mode: string;
};

function resolvePort(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 && parsed <= 65535 ? parsed : fallback;
}

export function createAppConfig({ appVariant, mode }: CreateAppConfigOptions): UserConfig {
  const projectRoot = process.cwd();
  const env = loadEnv(mode, projectRoot);
  const isDev = mode.endsWith('development');
  const port = resolvePort(
    appVariant === 'admin' ? env.VITE_ADMIN_PORT : env.VITE_SITE_PORT,
    appVariant === 'admin' ? 3006 : 3005,
  );
  const primaryOrigin = parseOrigin(appVariant === 'admin' ? env.VITE_ADMIN_ORIGIN : env.VITE_SITE_ORIGIN);
  const allowedHosts = collectAllowedHostnames(
    [
      env.VITE_SITE_ORIGIN,
      env.VITE_SITE_ALLOWED_ORIGINS,
      env.VITE_ADMIN_ORIGIN,
      env.VITE_ADMIN_ALLOWED_ORIGINS,
    ],
  );
  const hmrPort = resolvePort(
    appVariant === 'admin' ? env.VITE_ADMIN_HMR_PORT : env.VITE_SITE_HMR_PORT,
    port,
  );

  return defineConfig({
    envDir: projectRoot,
    publicDir: path.resolve(projectRoot, 'public'),
    define: {
      __APP_VARIANT__: JSON.stringify(appVariant),
    },
    plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(projectRoot, 'src'),
      },
    },
    server: {
      host: true,
      port,
      strictPort: true,
      allowedHosts,
      hmr: isDev
        ? {
            host: primaryOrigin?.hostname || 'localhost',
            port: hmrPort,
            protocol: 'ws',
          }
        : false,
    },
    build: {
      outDir: path.resolve(projectRoot, 'dist', appVariant),
      emptyOutDir: true,
      rollupOptions: {
        input: path.resolve(projectRoot, 'index.html'),
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor';
              }
              if (id.includes('react-router')) {
                return 'router';
              }
              if (id.includes('@heroui')) {
                return 'ui';
              }
            }

            return undefined;
          },
        },
      },
      chunkSizeWarningLimit: 1100,
    },
  });
}
