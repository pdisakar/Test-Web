import React from 'react';
import PackageCard from '../Cards/PackageCard/PackageCard';
import PrimaryButton from '../Buttons/PrimaryButton';

export interface FeaturedPackage {
  package_title: string;
  package_duration: number;
  total_testimonials: number;
  group_default_price: number;
  urlinfo: { url_slug: string };
  featured: { full_path: string };
  [key: string]: any;
}

export interface BestSellingCategory {
  packages?: FeaturedPackage[];
  [key: string]: any;
}

interface BestSellingPackagesProps {
  data?: BestSellingCategory;
  limit: number;
}

const BestSellingPackages: React.FC<BestSellingPackagesProps> = ({
  data,
  limit,
}) => {
  return (
    <section className="best-selling-packages common-box pt-0">
      <div className="container">
        <div className="title">
          <span>
            <svg
              className="icon"
              width="26"
              height="28"
              fill="currentColor">
              <use xlinkHref="/icons.svg#title-top" />
            </svg>
            Tour Package
          </span>
          <h2 className="text-center mx-auto">Best Selling Packages</h2>
          <p className="text-center mx-auto">
            Explore our best-selling packages, crafted for excellence and
            offering unmatched value and satisfaction.
          </p>
        </div>

        <div className="package-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {data?.packages?.slice(0, limit).map((pkg, index) => (
            <PackageCard
              key={index}
              pkg={pkg}
            />
          ))}
        </div>

        <div className="action-btn relative flex justify-center mt-12 after:absolute after:top-1/2 after:left-1/2 after:-translate-y-1/2 after:-translate-x-1/2 after:content-[''] after:w-full after:h-[1px] after:bg-dottedline after:-z-10">
          <PrimaryButton
            href="/best-selling-packages"
            label="All Best Selling Packages"
          />
        </div>
      </div>
    </section>
  );
};

export default BestSellingPackages;
