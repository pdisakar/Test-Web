import React from 'react';
import Link from 'next/link';

export interface FeaturedCategoryItem {
  id: string | number;
  title: string;
  all_packages: number;
  urlinfo: {
    url_slug: string;
  };
  [key: string]: any;
}

interface FeaturedCategoryProps {
  limit?: number;
  data: FeaturedCategoryItem[];
}

const FeaturedCategory: React.FC<FeaturedCategoryProps> = ({
  limit = 4,
  data,
}) => {
  return (
    <section className="featured-category common-box before:relative after:absolute after:content-[''] after:bg-worldmap after:bg-no-repeat after:bg-center after:opacity-100 after:top-0 after:left-0 after:w-full after:h-[424px] after:-z-10">
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
            Handpicked Activities
          </span>
          <h2 className="text-center mx-auto">Featured Categories</h2>
          <p className="text-center mx-auto">
            Embark on your next unforgettable journey filled with both
            relaxation and adventure—discover new experiences and start your
            holiday planning today!
          </p>
        </div>

        <ul className="category-section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 lg:[&>li]:border-r lg:[&>li:last-child]:border-none lg:[&>li]:border-secondary/50">
          {data?.slice(0, limit).map(item => (
            <li
              className="flex flex-col items-center justify-center px-6 py-3"
              key={item.id}>
              <Link
                aria-label={`View ${item.title} category`}
                href={item?.urlinfo?.url_slug}>
                <svg
                  width="70"
                  height="70">
                  <use
                    xlinkHref={`/icons.svg#${item.title
                      .toLowerCase()
                      .replace(/\s+/g, '-')}`}
                    fill="currentColor"
                  />
                </svg>
              </Link>
              <Link
                aria-label={`View ${item.title} category`}
                href={item?.urlinfo?.url_slug}>
                <div className="text-center mt-6">
                  <h3 className="mb-[14px] text-[22px] leading-1 text-headings font-bold">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-1 font-medium">
                    {item.all_packages.toString().padStart(2, '0')} Itineraries
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FeaturedCategory;
