import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
const HomeSearch = dynamic(() => import('../HomeSearch/HomeSearch'));


interface HomeBannerProps {
  optionalData: {
    [key: string]: any;
  };
}

const HomeBanner: React.FC<HomeBannerProps> = ({ optionalData }) => {
  return (
    <section className="hero-section px-0 lg:px-6">
      <figure className="image-slot before:aspect-[1856/750] w-full mx-auto relative min-h-[375px]">
        <Image
          src="/banner.webp"
          alt="Hero"
          width={1856}
          height={750}
          className="object-cover"
          title="Home Banner"
          priority
          sizes="(max-width: 768px) 100vw,
           (max-width: 1280px) 90vw,
           1856px"
        />
        <figcaption className="absolute top-1/2 left-1/2 z-10 text-center transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px]">
          <span className="text-[15px] font-semibold text-white flex items-center justify-center mb-1 gap-2">
            Experience the thrill of nature
          </span>
          <h2 className="text-[clamp(32px,5vw,52px)] text-white font-black text-center">
            Embark on Your Next Great Adventure Here
          </h2>
        </figcaption>
      </figure>

      <div className="home-search bg-secondary rounded-b-[20px] hidden lg:block">
        <div className="container py-6">
          <HomeSearch optionalData={optionalData} />
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
