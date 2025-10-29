'use client';

import { Customer } from '@/types/customer';
import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import CustomerForm from './CustomerForm';

interface Props {
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
}

export default function CustomersTable({ customers, setCustomers }: Props) {
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
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

  const handleDelete = (id: number) => {
    setCustomers(customers.filter((c) => c.id !== id));
  };

  const handleEdit = (updatedCustomer: Partial<Customer>) => {
    if (!currentCustomer) return;
    const updated: Customer = { ...currentCustomer, ...updatedCustomer };
    setCustomers(customers.map((c) => (c.id == updated.id ? updated : c)));
    setIsEditOpen(false);
  };

  const handleAdd = (data: Partial<Customer>) => {
    const newCustomer: Customer = {
      id: Date.now(),
      name: data.name ?? '',
      email: data.email ?? '',
      region: data.region ?? '',
      spent: data.spent ?? 0,
      active: data.active ?? true,
    };
    setCustomers([...customers, newCustomer]);
    setIsAddOpen(false);
  };

  return (
    <div className="bg-white dark:bg-gray-600 shadow rounded p-4">
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
      <button
        className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
        onClick={() => setIsAddOpen(true)}
      >
        + Add Customer
      </button>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left dark:bg-gray-600">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Region</th>
            <th className="p-2">Spent ($)</th>
            <th className="p-2">Status</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((c, index) => (
            <tr
              key={c.id}
              className={
                index % 2 == 0
                  ? 'bg-gray-50 border-t dark:bg-gray-500'
                  : 'bg-white border-t dark:bg-gray-400'
              }
            >
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
              <td className="p-2 flex gap-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                  onClick={() => {
                    setCurrentCustomer(c);
                    setIsEditOpen(true);
                  }}
                >
                  Edit
                </button>
              </td>
              <td className="p-2 flex gap-2">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => {
                    handleDelete(c.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add Customer">
        <CustomerForm onSubmit={handleAdd} />
      </Modal>
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Customer">
        {currentCustomer && <CustomerForm customer={currentCustomer} onSubmit={handleEdit} />}
      </Modal>
    </div>
  );
}
