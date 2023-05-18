'use client';

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
        <HeroSection />

        {/* <div className="space-y-4">
          <p className="text-gray-400 font-medium text-lg text-center">Trusted by amazing teams around the world</p>
          <div className="border-2 border-gray-200 rounded-[64px] px-16 py-8">
            <div className="flex flex-row gap-8 justify-between">
              <Logoipsum />
              <Logoipsum />
              <Logoipsum />
              <Logoipsum />
              <Logoipsum />
            </div>
          </div>
        </div> */}

        <div id="features">
          <div className="md:grid md:grid-cols-3 md:gap-4 md:space-y-0 space-y-4">
            <div className="col-span-2 relative h-[512px] overflow-hidden rounded-[32px] md:rounded-[64px] hover:rounded-[16px] md:hover:rounded-[32px] transition-[border-radius,transform] duration-200 border-2 border-gray-300">
              <Image
                src="/assets/drag-and-drop.png"
                width={1333}
                height={1024}
                className="-z-20"
                alt="Image that has Input, Output, Resize, Tint, Watermark and Text nodes that are connected to each other."
              />
              <div className="absolute w-full h-full inset-0 bg-gradient-to-t from-black via-black/75 to-transparent"></div>
              <div className="absolute bottom-16 text-center text-white/75 w-3/4 left-1/2 -translate-x-1/2 space-y-4">
                <h2 className="text-3xl font-medium text-white/90">Drag and Drop</h2>
                <p className="text-xl">
                  ImgFlow&apos;s intuitive editor makes it easy to build image processing pipelines.
                </p>
              </div>
            </div>
            <div className="relative h-[512px] overflow-hidden rounded-[32px] md:rounded-[64px] hover:rounded-[16px] md:hover:rounded-[32px] transition-[border-radius,transform] duration-200 border-2 border-gray-300">
              <Image
                src="/assets/modern-formats.png"
                width={650}
                height={1024}
                className="-z-20"
                alt="Image that shows output node with it's options. Output node's options are name, format and quality. Format is a selectable input and it has PNG selected, other options are WebP, AVIF, Jpeg, TIFF and GIF."
              />
              <div className="absolute w-full h-full inset-0 bg-gradient-to-t from-black via-black/75 to-transparent"></div>
              <div className="absolute bottom-16 text-center text-white/75 w-3/4 left-1/2 -translate-x-1/2 space-y-4">
                <h2 className="text-3xl font-medium text-white/90">Modern Formats</h2>
                <p className="text-xl">Output to modern formats such as WebP and AVIF.</p>
              </div>
            </div>
            <div className="col-span-3 relative h-[512px] overflow-hidden rounded-[32px] md:rounded-[64px] hover:rounded-[16px] md:hover:rounded-[32px] transition-[border-radius,transform] duration-200 border-2 border-gray-300">
              <Image
                src="/assets/optimize-and-transform-images.png"
                width={2016}
                height={1024}
                className="-z-20"
                alt="Image shows nodes that ImgFlow has. Shown nodes are Gamma, Watermark, Flip, Grayscale, Resize, Rotate, Text, Crop, Blur and Modulate."
              />
              <div className="absolute w-full h-full inset-0 bg-gradient-to-br from-black via-black/75 to-transparent"></div>
              <div className="absolute top-16 left-16 text-white/75 space-y-4">
                <h2 className="text-3xl font-medium text-white/90">Optimize and Transform Images</h2>
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
        <Footer />
      </div>
    </>
  );
};

export default Home;
