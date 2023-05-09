'use client';

import withAuth from '@/components/WithAuth';
import DashboardNavigation from '@/components/ui/DashboardNavigation';
import { TUser } from '@/stores/AuthStore';
import { PropsWithChildren } from 'react';

type TLayoutProps = PropsWithChildren;

const Layout = ({ children }: TLayoutProps) => {
  return (
    <div>
      <DashboardNavigation />
      <div>{children}</div>
    </div>
  );
};

export default withAuth<
  PropsWithChildren & {
    user: TUser;
  }
>(Layout, 'all');
