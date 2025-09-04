import Layout from '@/components/Layout';

export default function DashboardPage() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="">
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
