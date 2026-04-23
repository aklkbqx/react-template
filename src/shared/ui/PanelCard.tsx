import { Card, CardContent, CardHeader } from '@heroui/react';
import type { PropsWithChildren } from 'react';

type PanelCardProps = PropsWithChildren<{
  description?: string;
  title: string;
}>;

export function PanelCard({ children, description, title }: PanelCardProps) {
  return (
    <Card className="border border-white/10 bg-white/80 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)] backdrop-blur dark:bg-slate-900/70">
      <CardHeader className="flex flex-col items-start gap-1 pb-0">
        <h3 className="text-base font-semibold">{title}</h3>
        {description ? <p className="text-sm text-current/65">{description}</p> : null}
      </CardHeader>
      <CardContent className="pt-4">{children}</CardContent>
    </Card>
  );
}
