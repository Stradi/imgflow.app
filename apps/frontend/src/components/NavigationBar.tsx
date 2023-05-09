import Link from 'next/link';

export default function NavigationBar() {
  return (
    <nav className="max-w-5xl mx-auto bg-white my-2">
      <div>
        <Link href="/">
          <p className="font-bold text-xl select-none px-2 tracking-tighter">ImgFlow</p>
        </Link>
      </div>
    </nav>
  );
}
