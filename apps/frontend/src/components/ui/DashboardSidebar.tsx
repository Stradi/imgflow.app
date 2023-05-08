import { LayoutDashboardIcon, LucideProps, SettingsIcon, WalletIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from './Button';

type TDashboardSidebarItemProps = {
  href: string;
  label: string;
  icon: React.ReactElement<LucideProps>;
};

function DashboardSidebarItem({ href, label, icon }: TDashboardSidebarItemProps) {
  return (
    <li>
      <Link href={href} passHref>
        <Button
          className="w-full justify-start text-lg group-hover/all:hover:text-gray-950 group-hover/all:text-gray-400 group/item"
          variant="ghost"
        >
          <span className="[&>*]:mr-3 [&>*]:h-5 [&>*]:w-5 group-hover/item:translate-x-1 transition duration-100">
            {icon}
          </span>
          <span className="group-hover/item:translate-x-2 transition duration-100">{label}</span>
        </Button>
      </Link>
    </li>
  );
}

export default function DashboardSidebar() {
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-16 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto bg-white px-2">
        <ul className="space-y-2 group/all">
          <DashboardSidebarItem href="/dashboard" label="Dashboard" icon={<LayoutDashboardIcon />} />
          <DashboardSidebarItem href="/dashboard/billing" label="Billing" icon={<WalletIcon />} />
          <DashboardSidebarItem href="/dashboard/settings" label="Settings" icon={<SettingsIcon />} />
        </ul>
      </div>
    </aside>
  );
}
