'use client';

import DashboardNavigation from '@/components/ui/DashboardNavigation';
import DashboardSidebar from '@/components/ui/DashboardSidebar';
import useAuthGuard from '@/hooks/useAuthGuard';
import { PropsWithChildren } from 'react';

type TLayoutProps = PropsWithChildren;

const Layout = ({ children }: TLayoutProps) => {
  useAuthGuard(false, '/login');

  return (
    <div>
      <DashboardNavigation />
      <DashboardSidebar />
      <div className="md:ml-64 mt-14">{children}</div>
    </div>
  );
};

export default Layout;
