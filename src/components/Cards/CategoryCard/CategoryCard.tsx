import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const IMAGE_URL = process.env.IMAGE_URL || '';

interface UrlInfo {
  url_slug: string;
}

interface FeaturedImage {
  full_path: string;
}

export interface CategoryCardData {
  title: string;
  urlinfo: UrlInfo;
  featured?: FeaturedImage;
}

interface CategoryCardProps {
  category: CategoryCardData;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <div className="category-card group">
      <figure className="card-img">
        <Link
          className="image-slot rounded-t-lg before:aspect-[384/285.16]"
          href={`/${category.urlinfo.url_slug}`}
          title={category.title}
          aria-label={`View image for ${category.title}`}>
          <Image
            src={IMAGE_URL + (category.featured?.full_path || '')}
            alt={category.title}
            title={category.title}
            width={384}
            height={285}
            className="object-cover rounded-t-lg group-hover:scale-110 transition-transform duration-400 ease-in"
            sizes="(max-width: 384px) 100vw, 384px"
            priority
          />
        </Link>
      </figure>
      <figcaption className="px-5 py-[18px] border border-border border-t-0 rounded-b-lg text-center">
        <Link
          className="package-title"
          href={`/${category.urlinfo.url_slug}`}
          aria-label={`View details for ${category.title}`}>
          <h2 className="text-headings text-[22px] font-bold group-hover:text-primary group-hover:underline transition-all duration-150 ease-linear">
            {category.title}
          </h2>
        </Link>
      </figcaption>
    </div>
  );
};

export default CategoryCard;
