import React from 'react';
import Image from 'next/image';

const IMAGE_URL = process.env.IMAGE_URL || '';

export interface BannerData {
  full_path: string;
  full_name?: string;
}

interface PageBannerProps {
  banner: BannerData;
}

const PageBanner: React.FC<PageBannerProps> = ({ banner }) => {
  return (
    <figure className="image-slot before:aspect-[1920/750] min-h-[300px] max-h-[650px] w-full">
      <Image
        src={IMAGE_URL + banner.full_path}
        alt={banner.full_name || 'Page Banner'}
        width={1920}
        height={750}
        title={banner.full_name || 'Page Banner'}
        className="object-cover"
        sizes="(max-width: 1920px) 100vw, 1920px"
        priority
      />
    </figure>
  );
};

export default PageBanner;
