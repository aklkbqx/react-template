import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';

const rows = [
  { id: '1', name: 'Primary workflow', owner: 'Platform team', status: 'Placeholder' },
  { id: '2', name: 'Reporting module', owner: 'Product team', status: 'Pending' },
  { id: '3', name: 'Operations tooling', owner: 'Ops team', status: 'Placeholder' },
];

export function PlaceholderTable() {
  return (
    <Table aria-label="Starter placeholder table">
      <TableHeader>
        <TableColumn>MODULE</TableColumn>
        <TableColumn>OWNER</TableColumn>
        <TableColumn>STATUS</TableColumn>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.owner}</TableCell>
            <TableCell>{row.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
