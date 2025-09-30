'use client';

import { Customer } from '@/types/customer';
import { useEffect, useState } from 'react';
import customersData from '@/data/customerDetails.json';

export default function CustomersTable() {
  const [customers, setCustomers] = useState<Customer[]>(customersData);
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const filteredCustomers = customers.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = selectedRegion === 'All' || c.region === selectedRegion;
    return matchSearch && matchesRegion;
  });

  useEffect(() => {
    const stored = localStorage.getItem('customers');
    if (stored) {
      setCustomers(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers));
  }, [customers]);

  return (
    <div className="bg-white shadow rounded p-4">
      <div className="flex justify-between items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="Search customers..."
          className="border rounded p-2 w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border rounded p-2"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value="All">All Regions</option>
          <option value="North America">North America</option>
          <option value="Europe">Europe</option>
          <option value="Asia">Asia</option>
          <option value="South America">South America</option>
        </select>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Region</th>
            <th className="p-2">Spent ($)</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((c, index) => (
            <tr key={c.id} className={index % 2 == 0 ? 'bg-gray-50 border-t' : 'bg-white border-t'}>
              <td className="p-2">{c.name}</td>
              <td className="p-2">{c.email}</td>
              <td className="p-2">{c.region}</td>
              <td className="p-2">${c.spent}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded-full text-white text-sm ${
                    c.active ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {c.active ? 'Active' : 'Inactive'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
