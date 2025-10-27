'use client';
import customerData from '@/data/customers.json';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const COLOURS = ['#3b82f6', '#f59e0b'];

const pieData = [
  { name: 'New Customers', value: customerData.new },
  { name: 'Returning Customers', value: customerData.returning },
];

const CustomersPieChart = () => {
  return (
    <div className="bg-white shadow rounded p-4 dark:bg-gray-600">
      <h2 className="text-lg font-bold mb-4">Customer Breakdown</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLOURS[index % COLOURS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomersPieChart;
