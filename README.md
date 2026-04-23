# Frontend Project Setup

Starter project rebuilt around separated `site` and `admin` application shells using React, TypeScript, Tailwind CSS v4, and HeroUI.

## Available scripts

- `bun install`
- `bun run dev`
- `bun run dev:dual`
- `bun run dev:site`
- `bun run dev:admin`
- `bun run build`
- `bun run lint`
- `bun run preview:site`
- `bun run preview:admin`

## Env Files

- `.env.example`: team template for required keys
- `.env`: shared project values used by local scripts
- `.env.development`: machine-specific local dev values
- `.env.production`: production site/admin origins plus nginx deployment values

## Env Setup

1. Start from `.env.example`.
2. Keep `.env.development` as the real values for your machine, especially local IP and preferred admin subdomain.
3. Keep `.env.production` for deploy-time values only.

## Active structure

```text
src/
  app/
    providers/
    runtime/
  features/
    admin/
    user/
  shared/
    lib/
    types/
    ui/
  admin/
  site/
  index.css
```

## Notes

- The old business-specific app surface was removed from active use.
- `site` and `admin` still build separately, but now share one `index.html` and one `src/main.tsx`.
- Public and admin now separate by origin, with runtime redirects sending wrong-host access to the correct app origin.
- Shared UI lives in `src/shared/ui` and uses HeroUI plus Tailwind.
- Shared libraries remain available: React Router, React Query, Axios, i18n, and a socket starter provider.
