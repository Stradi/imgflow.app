'use client';

import withAuth from '@/components/WithAuth';
import DashboardNavigation from '@/components/ui/DashboardNavigation';
import DashboardSidebar from '@/components/ui/DashboardSidebar';
import { TUser } from '@/stores/AuthStore';
import { PropsWithChildren } from 'react';

type TLayoutProps = PropsWithChildren;

const Layout = ({ children }: TLayoutProps) => {
  return (
    <div>
      <DashboardNavigation />
      <DashboardSidebar />
      <div className="md:ml-64 mt-14">{children}</div>
    </div>
  );
};

export default withAuth<
  PropsWithChildren & {
    user: TUser;
  }
>(Layout, 'all');
