'use client';
import { Customer } from '@/types/customer';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const COLOURS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

interface Props {
  customers: Customer[];
}
export default function CustomerAnalytics({ customers }: Props) {
  const statusData = [
    { name: 'Active', value: customers.filter((customer) => customer.active).length },
    { name: 'Inactive', value: customers.filter((customer) => !customer.active).length },
  ];

  const regions = Array.from(new Set(customers.map((c) => c.region)));
  const revenueData = regions.map((region) => ({
    region,
    revenue: customers.filter((c) => c.region == region).reduce((sum, c) => sum + c.spent, 0),
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-4">Customer Status</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              dataKey="value"
            >
              <Cell></Cell>
            </Pie>
            {statusData.map((_, index) => (
              <Cell key={index} fill={COLOURS[index % COLOURS.length]} />
            ))}
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-4">Revenue by Region</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="region" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
