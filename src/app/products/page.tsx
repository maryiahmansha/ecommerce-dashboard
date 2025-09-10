import Layout from '@/components/Layout';
import ProductsTable from '@/components/ProductsTable';

export default function ProductsPage() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <ProductsTable />
    </Layout>
  );
}
