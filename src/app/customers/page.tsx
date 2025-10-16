'use client';
import CustomerAnalytics from '@/components/CustomerAnalytics';
import CustomersTable from '@/components/CustomersTable';
import Layout from '@/components/Layout';
import customersData from '@/data/customerDetails.json';
import { Customer } from '@/types/customer';
import { useEffect, useState } from 'react';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(customersData);

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
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Customers</h1>
      <CustomersTable customers={customers} setCustomers={setCustomers} />
      <CustomerAnalytics customers={customers} />
    </Layout>
  );
}
