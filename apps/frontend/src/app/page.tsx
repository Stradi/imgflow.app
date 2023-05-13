'use client';

import CTAButton from '@/components/landing/CTAButton';
import Footer from '@/components/landing/Footer';
import { Logoipsum } from '@/components/landing/Logoipsum';
import Pricing from '@/components/landing/Pricing';

const Home = () => {
  return (
    <div className="max-w-5xl mx-auto px-2 space-y-16">
      <div className="bg-gradient-to-br from-[#0C2400] to-black rounded-[64px]">
        <div className="flex flex-col py-16 gap-8 w-3/4 mx-auto">
          <h1 className="text-6xl font-bold text-transparent leading-snug text-center bg-clip-text bg-gradient-to-b from-[#7AFF87] to-[#50A759]">
            Stop Wasting Time on Image Processing
          </h1>
          <p className="text-white/75 text-center text-2xl w-3/4 mx-auto">
            Streamline your image processing workflow with ImgFlow&apos;s node-based drag and drop editor.
          </p>
          <CTAButton />
        </div>
      </div>

      <div className="space-y-4">
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
      </div>

      {/* Place video here */}
      {/* <div className="aspect-video w-full bg-gray-200 rounded-[64px]"></div> */}

      <div id="features">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 relative h-[512px] overflow-hidden rounded-[64px] hover:rounded-[32px] transition-[border-radius,transform] duration-200">
            <img src="https://picsum.photos/1024/1024" className="-z-20 w-full h-full absolute inset-0" />
            <div className="absolute w-full h-full inset-0 bg-gradient-to-t from-black via-black/75 to-transparent -z-10"></div>
            <div className="absolute bottom-16 text-center text-white/75 w-3/4 left-1/2 -translate-x-1/2 space-y-4">
              <h2 className="text-3xl font-medium text-white/90">Drag and Drop</h2>
              <p className="text-xl">
                ImgFlow&apos;s intuitive editor makes it easy to build image processing pipelines.
              </p>
            </div>
          </div>
          <div className="relative h-[512px] overflow-hidden rounded-[64px] hover:rounded-[32px] transition-[border-radius,transform] duration-200">
            <img src="https://picsum.photos/1024/1024" className="-z-20 w-full h-full absolute inset-0" />
            <div className="absolute w-full h-full inset-0 bg-gradient-to-t from-black via-black/75 to-transparent -z-10"></div>
            <div className="absolute bottom-16 text-center text-white/75 w-3/4 left-1/2 -translate-x-1/2 space-y-4">
              <h2 className="text-3xl font-medium text-white/90">Modern Formats</h2>
              <p className="text-xl">Output to modern formats such as WebP and AVIF.</p>
            </div>
          </div>
          <div className="col-span-3 relative h-[512px] overflow-hidden rounded-[64px] hover:rounded-[32px] transition-[border-radius,transform] duration-200">
            <img src="https://picsum.photos/1024/1024" className="-z-20 w-full h-full absolute inset-0" />
            <div className="absolute w-full h-full inset-0 bg-gradient-to-br from-black via-black/75 to-transparent -z-10"></div>
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

      <Pricing />
      <Footer />
    </div>
  );
};

export default Home;
