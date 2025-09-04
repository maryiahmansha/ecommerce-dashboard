import { Sidebar } from '@/components/Sidebar';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
