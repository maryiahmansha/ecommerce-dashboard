import { Customer } from '@/types/customer';
import { useTheme } from 'next-themes';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface Props {
  customers: Customer[];
}

export default function TopSpenders({ customers }: Props) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const axisColor = isDark ? '#d1d5db' : '#374151';
  const barColor = isDark ? '#60a5fa' : '#2563eb';

  const topSpenders = [...customers].sort((a, b) => b.spent - a.spent).slice(0, 5);

  return (
    <div className="bg-white shadow rounded p-4 mt-5 dark:bg-gray-600">
      <h2 className="text-lg font-semibold mb-4">Top 5 Spenders</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={topSpenders}
            layout="vertical"
            margin={{ top: 10, right: 10, bottom: 10, left: 40 }}
          >
            <XAxis type="number" stroke={axisColor} />
            <YAxis type="category" dataKey="name" width={100} stroke={axisColor} />
            <Tooltip />
            <Bar fill={barColor} dataKey="spent" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
