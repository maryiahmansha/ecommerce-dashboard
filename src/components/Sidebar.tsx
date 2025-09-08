import Link from 'next/link';

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <nav className="flex flex-col gap-2">
        <Link href="/dashboard" className="hover:text-blue-500">
          Home
        </Link>
        <Link href="/products" className="hover:text-blue-500">
          Products
        </Link>
        <Link href="/customers" className="hover:text-blue-500">
          Customers
        </Link>
        <Link href="/settings" className="hover:text-blue-500">
          Settings
        </Link>
      </nav>
    </aside>
  );
};
