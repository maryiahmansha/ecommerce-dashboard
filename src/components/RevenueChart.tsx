'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import salesData from '@/data/sales.json';
import { useTheme } from 'next-themes';

const RevenueChart = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const axisColor = isDark ? '#d1d5db' : '#374151';
  const lineColor = isDark ? '#60a5fa' : '#2563eb';

  return (
    <div className="bg-white shadow rounded p-4 dark:bg-gray-600">
      <h2 className="text-lg font-bold mb-4">Revenue Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={salesData}>
          <XAxis dataKey="month" stroke={axisColor} />
          <YAxis stroke={axisColor} />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke={lineColor} strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
