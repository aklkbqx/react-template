import { Card, CardContent, Chip } from '@heroui/react';

const cards = [
  { label: 'Role surface', value: 'User', hint: 'Member-facing skeleton' },
  { label: 'Navigation', value: 'Ready', hint: 'Dashboard, settings, not-found' },
  { label: 'Auth shell', value: 'Starter', hint: 'Local session flow for setup' },
];

export function UserSummaryGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.label} className="border border-slate-200 bg-white">
          <CardContent className="gap-4">
            <Chip className="border border-blue-200 bg-blue-100 text-blue-700" size="sm" variant="soft">
              {card.label}
            </Chip>
            <div>
              <p className="text-2xl font-semibold text-slate-950">{card.value}</p>
              <p className="text-sm text-slate-500">{card.hint}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
