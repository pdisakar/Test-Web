'use client';

import React, { useState } from 'react';
import axios from 'axios';
import BlogCard from '../Cards/BlogCard/BlogCard';
import { PRODUCTION_SERVER, SITE_KEY } from '@/lib/constants';

export interface BlogAuthor {
  name?: string;
}

export interface BlogItemType {
  id: string | number;
  title: string;
  summary?: string;
  blog_date: string | Date;
  urlinfo: { url_slug: string };
  featured?: { full_path: string };
  authors?: BlogAuthor[];
  [key: string]: any;
}

interface BlogListProps {
  initialPosts: BlogItemType[];
}

const BlogList: React.FC<BlogListProps> = ({ initialPosts }) => {
  const [posts, setPosts] = useState<BlogItemType[]>(initialPosts);
  const [isLoading, setIsLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMore = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `${PRODUCTION_SERVER}/allblogs?_start=${posts.length}&_limit=6`,
        { headers: { sitekey: SITE_KEY } }
      );

      const newPost: BlogItemType[] = response.data?.data.content || [];

      setPosts(prevPosts => [...prevPosts, ...newPost]);

      if (newPost.length === 0) {
        setNoData(true);
      }
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {posts.map((item, idx) => (
          <BlogCard
            blog={item}
            key={idx}
          />
        ))}
      </ul>

      {noData && (
        <p className="text-center font-bold">
          <b>No more Blogs to show!</b>
        </p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!noData && (
        <div className="text-center">
          <button
            onClick={loadMore}
            disabled={isLoading}
            aria-label="Load more"
            className="py-[14px] px-[26px] bg-primary rounded-full text-white font-bold leading-[1] capitalize border-b-[3px] border-r-[3px] border-[#5C6554]">
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogList;
