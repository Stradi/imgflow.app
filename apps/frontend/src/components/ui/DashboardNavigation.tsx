import useAuthStore from '@/stores/AuthStore';
import { cn } from '@/utils/tw';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { forwardRef, useEffect, useState } from 'react';
import { Button } from './Button';

type TNavigationItemProps = {
  href: string;
  label: string;
  isActive?: boolean;
  onMouseEnter?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

const NavigationItem = forwardRef<HTMLAnchorElement, TNavigationItemProps>(
  ({ href, label, isActive, onMouseEnter }, ref) => {
    return (
      <Link href={href} onMouseEnter={onMouseEnter} ref={ref}>
        <li
          className={cn(
            'relative p-2 text-sm font-medium text-gray-400',
            'group/item group-hover/all:hover:text-gray-950 group-hover/all:text-gray-400',
            'transition-[color] duration-100',
            isActive && 'text-gray-950'
          )}
        >
          {label}
        </li>
      </Link>
    );
  }
);
NavigationItem.displayName = 'NavigationItem';

export default function DashboardNavigation() {
  // 500px is the first item in my screen, so why not start with that
  const [left, setLeft] = useState(500);
  const [width, setWidth] = useState(0);

  const { logout } = useAuthStore((state) => ({
    logout: state.logout,
  }));

  function handleOnMouseEnter(e: React.MouseEvent<HTMLAnchorElement>) {
    const target = e.target as HTMLAnchorElement;
    const { offsetLeft, offsetWidth } = target;
    setLeft(offsetLeft + target.offsetWidth / 2);
    setWidth(offsetWidth);
  }

  const [items] = useState([
    {
      href: '/dashboard',
      label: 'Overview',
      ref: React.createRef<HTMLAnchorElement>(),
    },
    {
      href: '/dashboard/usage',
      label: 'Usage',
      ref: React.createRef<HTMLAnchorElement>(),
    },
    {
      href: '/dashboard/settings',
      label: 'Settings',
      ref: React.createRef<HTMLAnchorElement>(),
    },
  ]);

  const pathname = usePathname();
  const activeItem = items.find((item) => item.href === pathname);

  function moveIndicatorToDefaultPosition() {
    if (activeItem && activeItem.ref && activeItem.ref.current) {
      setLeft(activeItem.ref.current.offsetLeft + activeItem.ref.current.offsetWidth / 2);
      setWidth(activeItem.ref.current.offsetWidth);
    } else {
      setWidth(0);
    }
  }

  useEffect(() => {
    moveIndicatorToDefaultPosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeItem]);

  return (
    <header>
      <nav className="border-b relative border-gray-300">
        <div
          className="transition-[left,width] duration-300 absolute bottom-0 left-0 h-0.5 bg-gray-950 rounded-full"
          style={{
            left: left - (width * 0.75) / 2,
            width: width * 0.75,
          }}
        />
        <div className="max-w-5xl mx-auto flex justify-between">
          <ul className="flex group/all" onMouseLeave={() => moveIndicatorToDefaultPosition()}>
            {items.map((item) => (
              <NavigationItem
                key={item.href}
                ref={item.ref}
                href={item.href}
                label={item.label}
                isActive={item.href === activeItem?.href}
                onMouseEnter={handleOnMouseEnter}
              />
            ))}
          </ul>
          <div>
            <Button size="sm" variant="ghost" onClick={() => logout()}>
              Logout
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
