import { Card, CardContent, Chip } from '@heroui/react';

const cards = [
  { label: 'Role surface', value: 'Admin', hint: 'Back-office skeleton' },
  { label: 'UI stack', value: 'HeroUI', hint: 'Tailwind + shared primitives' },
  { label: 'Data stack', value: 'Ready', hint: 'React Query + Axios client' },
];

export function AdminSummaryGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.label} className="border border-white/10 bg-slate-950 text-slate-100">
          <CardContent className="gap-4">
            <Chip className="border border-teal-400/25 bg-teal-400/10 text-teal-200" size="sm" variant="soft">
              {card.label}
            </Chip>
            <div>
              <p className="text-2xl font-semibold">{card.value}</p>
              <p className="text-sm text-slate-400">{card.hint}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
