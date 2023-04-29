import DashboardNavigation from '@/components/ui/DashboardNavigation';
import DashboardSidebar from '@/components/ui/DashboardSidebar';
import { PropsWithChildren } from 'react';

type TLayoutProps = PropsWithChildren;

export default function Layout({ children }: TLayoutProps) {
  return (
    <div>
      <DashboardNavigation />
      <DashboardSidebar />
      <div className="md:ml-64 mt-14">{children}</div>
    </div>
  );
}
