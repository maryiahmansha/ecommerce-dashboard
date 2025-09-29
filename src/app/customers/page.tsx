import CustomerAnalytics from '@/components/CustomerAnalytics';
import CustomersTable from '@/components/CustomersTable';
import Layout from '@/components/Layout';
import customersData from '@/data/customerDetails.json';

export default function CustomersPage() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Customers</h1>
      <CustomersTable />
      <CustomerAnalytics customers={customersData} />
    </Layout>
  );
}
