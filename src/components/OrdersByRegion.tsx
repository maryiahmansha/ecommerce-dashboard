'use client';

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import regionData from '@/data/regions.json';
const OrdersByRegion = () => {
  return (
    <div className="bg-white shadow rounded p-4 dark:bg-gray-600">
      <h2 className="text-lg font-bold mb-4">Orders by Region</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={regionData}>
          <XAxis dataKey="region" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="orders" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrdersByRegion;
