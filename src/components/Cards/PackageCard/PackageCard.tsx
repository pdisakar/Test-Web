import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import PackageButton from '@/components/Buttons/PackageButton';
import { PackageCardProps } from '@/lib/types';

const IMAGE_URL = process.env.IMAGE_URL;

const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {
  return (
    <div className="card group h-fit shadow-custom-shadow rounded-xl">
      <figure className="card-img">
        <Link
          className="image-slot before:aspect-[640/648] rounded-t-xl"
          href={pkg.urlinfo.url_slug}
          aria-label={`View image for ${pkg.package_title}`}
          title={pkg.package_title}>
          <Image
            src={IMAGE_URL + pkg.featured?.full_path}
            title={pkg.package_title}
            alt={pkg.package_title}
            width={640}
            height={648}
            className="object-cover group-hover:scale-110 transition-transform duration-400 ease-in"
            priority
            sizes="(max-width: 640px) 100vw,
           (max-width: 1024px) 50vw,
           640px"
          />
        </Link>
      </figure>

      <figcaption>
        <div className="top-section p-6">
          <div className="package_rating flex items-center gap-1 mb-[5px]">
            <svg
              className="icon text-primary"
              width="74"
              height="14">
              <use
                xlinkHref={`/icons.svg#fivestar`}
                fill="currentColor"
              />
            </svg>

            {pkg.total_testimonials > 0 && (
              <span className="text-sm leading-[1] text-muted font-light">
                ({pkg.total_testimonials.toString().padStart(2, '0')})
              </span>
            )}
          </div>

          <Link
            className="package-title"
            href={pkg.urlinfo.url_slug}
            aria-label={`View-details for ${pkg.package_title}`}>
            <h2 className="text-headings text-[22px] font-bold group-hover:text-primary group-hover:underline transition-all duration-150 ease-linear">
              {pkg.package_title}
            </h2>
          </Link>

          <div className="duration flex items-center gap-1 mt-[15px]">
            <svg
              className="icon text-muted"
              width="15"
              height="15">
              <use
                xlinkHref={`/icons.svg#duration`}
                fill="currentColor"
              />
            </svg>
            <span className="text-sm leading-[1] text-muted font-medium">
              {pkg.package_duration.toString().padStart(2, '0')} days{' '}
              {pkg.package_duration - 1} nights
            </span>
          </div>
        </div>

        <div className="cost flex items-center justify-between gap-4 flex-wrap px-6 py-5 border-t border-border rounded-b-xl">
          <div>
            <p className="text-xs font-semibold text-headings">
              Starting From:
            </p>
            <p className="text-[22px] font-black text-primary">
              US$ {pkg.group_default_price}
            </p>
          </div>

          <PackageButton
            label="Book this"
            href={pkg.urlinfo.url_slug}
          />
        </div>
      </figcaption>
    </div>
  );
};

export default PackageCard;
