import { LayoutDashboardIcon, LucideProps, SettingsIcon, WalletIcon, WorkflowIcon } from 'lucide-react';
import Link from 'next/link';

type TDashboardSidebarItemProps = {
  href: string;
  label: string;
  icon: React.ReactElement<LucideProps>;
};

function DashboardSidebarItem({ href, label, icon }: TDashboardSidebarItemProps) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        {icon}
        <span className="ml-3">{label}</span>
      </Link>
    </li>
  );
}

export default function DashboardSidebar() {
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <DashboardSidebarItem href="/dashboard" label="Dashboard" icon={<LayoutDashboardIcon />} />
          <DashboardSidebarItem href="/dashboard/pipelines" label="My Pipelines" icon={<WorkflowIcon />} />
          <DashboardSidebarItem href="/dashboard/billing" label="Billing" icon={<WalletIcon />} />
          <DashboardSidebarItem href="/dashboard/settings" label="Settings" icon={<SettingsIcon />} />
        </ul>
      </div>
    </aside>
  );
}
