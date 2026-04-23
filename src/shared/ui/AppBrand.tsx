import { Chip } from '@heroui/react';

type AppBrandProps = {
  accent: 'admin' | 'user';
  subtitle: string;
  title: string;
};

export function AppBrand({ accent, subtitle, title }: AppBrandProps) {
  const chipClassName =
    accent === 'admin'
      ? 'border border-teal-400/30 bg-teal-400/10 text-teal-200'
      : 'border border-blue-300/70 bg-blue-100 text-blue-700';

  return (
    <div className="space-y-3">
      <Chip className={chipClassName} size="sm" variant="soft">
        {subtitle}
      </Chip>
      <div>
        <p className={accent === 'admin' ? 'text-slate-100' : 'text-slate-900'}>
          Frontend Project Setup
        </p>
        <h1
          className={
            accent === 'admin'
              ? 'text-2xl font-semibold tracking-tight text-white'
              : 'text-2xl font-semibold tracking-tight text-slate-950'
          }
        >
          {title}
        </h1>
      </div>
    </div>
  );
}
