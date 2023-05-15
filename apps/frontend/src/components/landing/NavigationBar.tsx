import Link from 'next/link';
import { Button } from '../ui/Button';

export default function NavigationBar() {
  return (
    <nav className="mt-2 mb-8 max-w-5xl px-2 mx-auto flex justify-between items-center">
      <ul>
        <Link href="/">
          <li>ImgFlow</li> {/* Logo */}
        </Link>
      </ul>
      <ul className="flex gap-2 items-center text-sm">
        <Link href="/#pricing">
          <li className="hover:bg-gray-50 px-4 py-3 rounded-full transition duration-100">Pricing</li>
        </Link>
        <Link href="/#features">
          <li className="hover:bg-gray-50 px-4 py-3 rounded-full transition duration-100">Features</li>
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
