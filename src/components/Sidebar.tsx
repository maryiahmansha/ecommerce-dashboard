import Link from 'next/link';

export const Sidebar = () => {
  return (
    <aside>
      <h2>Dashboard</h2>
      <nav>
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
