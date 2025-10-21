import { Customer } from '@/types/customer';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface Props {
  customers: Customer[];
}

export default function TopSpenders({ customers }: Props) {
  const topSpenders = [...customers].sort((a, b) => b.spent - a.spent).slice(0, 5);
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-semibold mb-4">Top 5 Spenders</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={topSpenders}
            layout="vertical"
            margin={{ top: 10, right: 10, bottom: 10, left: 40 }}
          >
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" width={100} />
            <Tooltip />
            <Bar fill="#2563eb" dataKey="spent" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
