import Layout from '@/components/Layout';

export default function DashboardPage() {
  return (
    <Layout>
      <h1>Dashboard</h1>
      <div>
        {/* {KPI cards} */}
        <div>Revenue</div>
        <div>Orders</div>
        <div>Customers</div>
      </div>
      <div>
        {/* {Charts} */}
        <div>Revenue Chart</div>
        <div>Orders by Region</div>
      </div>
    </Layout>
  );
}
