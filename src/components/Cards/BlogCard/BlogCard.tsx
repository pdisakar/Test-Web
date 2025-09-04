import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { IMAGE_URL } from '@/lib/constants';
import { BlogCardProps } from '@/lib/types';

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <li>
      <div className="item grid grid-cols-1 lg:grid-cols-5 gap-5 items-center overflow-hidden group">
        <figure className="col-span-1 lg:col-span-2 relative image-slot w-full aspect-[760/640] rounded-[4px] overflow-hidden">
          <Link
            href={`blog/${blog.urlinfo?.url_slug || ''}`}
            aria-label={`View image for ${blog.title}`}
            className="block w-full h-full">
            {blog.featured?.full_path ? (
              <Image
                src={IMAGE_URL + blog.featured.full_path}
                alt={blog.title}
                height={640}
                width={760}
                title={blog.title}
                className="object-cover w-full h-full rounded-[4px] transition-transform duration-400 ease-in group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, 640px"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gray-200 animate-pulse" />
            )}
          </Link>
        </figure>

        <figcaption className="col-span-1 lg:col-span-3 w-full">
          <Link
            href={`blog/${blog.urlinfo?.url_slug || ''}`}
            aria-label={`View details for ${blog.title}`}
            className="block">
            <h3 className="text-xl text-headings font-black leading-[160%] hover:text-primary hover:underline transition-all duration-150 ease-linear">
              {blog.title}
            </h3>
          </Link>
          <div className="about-blog flex flex-col sm:flex-row sm:items-center gap-3 mt-4">
            <span className="blog-author capitalize text-primary font-semibold">
              {blog.authors?.[0]?.name || blog.author?.name || 'Unknown Author'}
            </span>
            <span className="blog-date capitalize font-semibold">
              {blog.blog_date ? format(new Date(blog.blog_date), 'dd MMM yyyy') : ''}
            </span>
          </div>
        </figcaption>
      </div>
    </li>
  );
};

export default BlogCard;
