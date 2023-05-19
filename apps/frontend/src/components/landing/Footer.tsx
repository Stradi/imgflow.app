import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      className="text-sm rounded-t-[16px] md:rounded-t-[32px] p-6 md:p-12 grid md:grid-cols-6 text-white/50 space-y-4 md:space-y-0"
      style={{
        background: 'radial-gradient(circle at 15% 0%, #071500 0%, #000000 100%)',
      }}
    >
      <div className="md:col-span-3">
        <p className="font-medium text-white/75">ImgFlow</p>
        <p>
          ImgFlow is a powerful image processing platform that allows users to effortlessly optimize, transform, and
          manage their images.
        </p>
      </div>
      <div className="flex flex-col">
        <p className="font-medium text-white/75">Company</p>
        <Link className="hover:text-white/75 transition-[color] duration-100" href="/about">
          About us
        </Link>
        <Link className="hover:text-white/75 transition-[color] duration-100" href="/contact">
          Contact us
        </Link>
      </div>
      <div className="flex flex-col">
        <p className="font-medium text-white/75">Product</p>
        <Link className="hover:text-white/75 transition-[color] duration-100" href="#features">
          Features
        </Link>
        <Link className="hover:text-white/75 transition-[color] duration-100" href="#pricing">
          Pricing
        </Link>
        <Link className="hover:text-white/75 transition-[color] duration-100" href="/changelog">
          Changelog
        </Link>
      </div>
      <div className="flex flex-col">
        <p className="font-medium text-white/75">Resources</p>
        <Link className="hover:text-white/75 transition-[color] duration-100" href="/blog">
          Blog
        </Link>
        <Link className="hover:text-white/75 transition-[color] duration-100" href="/docs">
          Docs
        </Link>
        <Link className="hover:text-white/75 transition-[color] duration-100" href="/terms-of-service">
          Terms of service
        </Link>
        <Link className="hover:text-white/75 transition-[color] duration-100" href="/privacy-policy">
          Privacy policy
        </Link>
      </div>
    </footer>
  );
}
