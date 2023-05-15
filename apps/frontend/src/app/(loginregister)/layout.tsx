'use client';

import withAuth from '@/components/WithAuth';
import { Switch } from '@/components/ui/Switch';
import { TUser } from '@/stores/AuthStore';
import useEasterEggStore from '@/stores/EasterEggStore';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

type TLayoutProps = PropsWithChildren;

const Layout = ({ children }: TLayoutProps) => {
  const { sarcasticMode, setSarcasticMode } = useEasterEggStore((state) => ({
    sarcasticMode: state.sarcasticMode,
    setSarcasticMode: state.setSarcasticMode,
  }));

  return (
    <div>
      <div className="fixed top-4 w-full grid grid-cols-2 gap-2 z-10">
        <div></div>
        <div className="flex justify-between">
          <ul className="w-fit">
            <Link href="/">
              <li className="group relative px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition duration-100">
                <span className="absolute opacity-0 rotate-[30deg] translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 group-hover:rotate-0 transition-[transform,opacity] duration-100">
                  ←
                </span>
                <span className="ml-4">Back to Homepage</span>
              </li>
            </Link>
          </ul>
          <div className="flex items-center space-x-2 mr-4">
            <Switch id="sarcastic-mode" checked={sarcasticMode} onCheckedChange={(val) => setSarcasticMode(val)} />
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default withAuth<
  PropsWithChildren & {
    user: TUser;
  }
>(Layout, 'auth');
