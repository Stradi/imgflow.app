import Link from 'next/link';
import Logo from '../Logo';
import { Button } from '../ui/Button';

export default function NavigationBar() {
  return (
    <nav className="mt-2 mb-8 max-w-5xl px-2 mx-auto flex justify-between items-center">
      <Logo />
      <ul className="flex gap-2 items-center text-sm font-medium">
        <Link href="/#pricing" className="hidden md:block">
          <li className="hover:bg-gray-50 hover:text-black text-gray-500 px-4 py-3 rounded-full transition duration-100">
            Pricing
          </li>
        </Link>
        <Link href="/#features" className="hidden md:block">
          <li className="hover:bg-gray-50 hover:text-black text-gray-500 px-4 py-3 rounded-full transition duration-100">
            Features
          </li>
        </Link>
        <Link href="/#how-it-works" className="hidden md:block">
          <li className="hover:bg-gray-50 hover:text-black text-gray-500 px-4 py-3 rounded-full transition duration-100">
            How It Works
          </li>
        </Link>
        <Link href="/login" passHref>
          <Button variant="outline" className="rounded-full">
            Login
          </Button>
        </Link>
        <Link href="/register" passHref>
          <Button className="rounded-full">Get Started</Button>
        </Link>
      </ul>
    </nav>
  );
}
