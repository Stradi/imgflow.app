'use client';

import Faq from '@/components/landing/Faq';
import Footer from '@/components/landing/Footer';
import HeroSection from '@/components/landing/HeroSection';
import HowItWorks from '@/components/landing/HowItWorks';
import NavigationBar from '@/components/landing/NavigationBar';
import Pricing from '@/components/landing/Pricing';
import Image from 'next/image';

const Home = () => {
  return (
    <>
      <NavigationBar />
      <div className="max-w-5xl mx-auto px-2 space-y-16">
        <div className="flex flex-col gap-2">
          <a
            href="https://www.producthunt.com/posts/imgflow?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-imgflow"
            target="_blank"
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=395358&theme=light"
              alt="ImgFlow - Simplify&#0032;Image&#0032;Processing | Product Hunt"
              style={{
                width: '250px',
                height: '54px',
              }}
              width="250"
              height="54"
              className="mx-auto"
            />
          </a>
          <HeroSection />
        </div>
        <div id="features">
          <div className="md:grid md:grid-cols-3 md:gap-4 md:space-y-0 space-y-4">
            <div className="col-span-2 relative h-[512px] overflow-hidden rounded-[32px] md:rounded-[64px] border-2 border-gray-100">
              <Image
                src="/assets/drag-and-drop.png"
                width={1333}
                height={1024}
                className="-z-20"
                alt="Image that has Input, Output, Resize, Tint, Watermark and Text nodes that are connected to each other."
              />
              <div className="absolute bottom-16 text-center text-black/75 w-3/4 left-1/2 -translate-x-1/2 space-y-4">
                <h2 className="text-3xl font-medium text-black/90">Drag and Drop</h2>
                <p className="text-xl">
                  ImgFlow&apos;s intuitive editor makes it easy to build image processing pipelines.
                </p>
              </div>
            </div>
            <div className="relative h-[512px] overflow-hidden rounded-[32px] md:rounded-[64px] border-2 border-gray-100">
              <Image
                src="/assets/modern-formats.png"
                width={650}
                height={1024}
                className="-z-20"
                alt="Image that shows output node with it's options. Output node's options are name, format and quality. Format is a selectable input and it has PNG selected, other options are WebP, AVIF, Jpeg, TIFF and GIF."
              />
              <div className="absolute bottom-16 text-center text-black/75 w-3/4 left-1/2 -translate-x-1/2 space-y-4">
                <h2 className="text-3xl font-medium text-black/90">Modern Formats</h2>
                <p className="text-xl">Output to modern formats such as WebP and AVIF.</p>
              </div>
            </div>
            <div className="col-span-3 relative h-[512px] overflow-hidden rounded-[32px] md:rounded-[64px] border-2 border-gray-100">
              <Image
                src="/assets/optimize-and-transform-images.png"
                width={2016}
                height={1024}
                className="-z-20"
                alt="Image shows nodes that ImgFlow has. Shown nodes are Gamma, Watermark, Flip, Grayscale, Resize, Rotate, Text, Crop, Blur and Modulate."
              />
              <div className="absolute top-16 left-16 text-black/75 space-y-4">
                <h2 className="text-3xl font-medium text-black/90">Optimize and Transform Images</h2>
                <div>
                  <p className="text-xl">Resize, crop, rotate, add filters...</p>
                  <p className="text-xl">Oh, you can add watermark too.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <HowItWorks />
        <Pricing />
        <Faq />
        <Footer />
      </div>
    </>
  );
};

export default Home;
