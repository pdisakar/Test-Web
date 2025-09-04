'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { IMAGE_URL } from '@/lib/constants';

export interface TripGalleryItem {
  id?: string | number;
  alt_text?: string | null;
  media: {
    full_path: string;
  };
}

interface TripGalleryProps {
  data?: TripGalleryItem[];
}

const TripGallery: React.FC<TripGalleryProps> = ({ data = [] }) => {
  useEffect(() => {
    return () => Fancybox.destroy();
  }, []);

  const openFancybox = (e: React.MouseEvent<HTMLElement>, startIndex = 0) => {
    e.preventDefault();

    const slides = data.map(item => ({
      src: IMAGE_URL + item.media.full_path,
      type: 'image' as const,
    }));

    Fancybox.show(slides, { startIndex });
  };

  if (!data.length) return null;

  return (
    <div className="trip-gallery relative">
      <div className="grid grid-cols-4 grid-rows-2 gap-2 md:gap-4 [&>*:nth-child(1)]:col-span-4 [&>*:nth-child(1)]:row-span-2 [&>*:not(:nth-child(1))]:col-span-2 [&>*:not(:nth-child(1))]:row-span-1 md:[&>*:nth-child(1)]:col-span-2 md:[&>*:nth-child(1)]:row-span-2 md:[&>*:not(:nth-child(1))]:col-span-2 md:[&>*:not(:nth-child(1))]:row-span-1">
        {data.slice(0, 3).map((item, index) => (
          <Link
            key={item.id ?? index}
            href={IMAGE_URL + item.media.full_path}
            onClick={e => openFancybox(e, index)}
            className="image-slot before:aspect-[400/150] min-h-[150px]">
            <Image
              src={IMAGE_URL + item.media.full_path}
              alt={item.alt_text ?? `Trip gallery image ${index + 1}`}
              width={400}
              height={150}
              title={item.alt_text ?? `Trip gallery image ${index + 1}`}
              className="object-cover rounded-md md:rounded-lg"
              sizes="(max-width: 400px) 100vw, 400px"
              priority
            />
          </Link>
        ))}
      </div>

      {data.length > 3 && (
        <button
          onClick={e => openFancybox(e, 0)}
          className="backdrop-blur-sm z-10 bg-white/10 border border-white/50 shadow-md flex px-3 py-1 rounded-full gap-2 text-white text-sm absolute bottom-4 right-4 font-light transition hover:bg-white/20 focus:outline-none">
          <svg
            className="icon text-white"
            width="18"
            height="18">
            <use
              xlinkHref={`/icons.svg#gallery`}
              fill="currentColor"
            />
          </svg>
          Show All
        </button>
      )}
    </div>
  );
};

export default TripGallery;
