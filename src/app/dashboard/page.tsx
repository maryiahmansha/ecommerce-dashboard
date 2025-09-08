import Layout from '@/components/Layout';
import salesData from '@/data/sales.json';
import customerData from '@/data/customers.json';
import KPI from '@/components/KPI';
import RevenueChart from '@/components/RevenueChart';
import OrdersByRegion from '@/components/OrdersByRegion';

export default function DashboardPage() {
  const totalRevenue = salesData.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalOrders = salesData.reduce((acc, curr) => acc + curr.orders, 0);
  const totalCustomers = customerData.new + customerData.returning;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPI title="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} />
        <KPI title="Total Products" value={totalOrders} />
        <KPI title="Total Customers" value={totalCustomers} />
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <RevenueChart />
        <OrdersByRegion />
      </div>
    </Layout>
  );
}
