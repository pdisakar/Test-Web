'use client';

import React, { useState } from 'react';
import axios from 'axios';
import TestimonialsCard from '../Cards/TestimonialsCard/TestimonialsCard'; // Adjust the import path as needed
import { PRODUCTION_SERVER, SITE_KEY } from '@/lib/constants'; // Adjust the import path as needed

export interface Testimonial {
  id?: string | number;
  full_name: string;
  review_date: string | Date;
  review: string;
  urlinfo: {
    url_title: string;
  };
}

interface TestimonialListProps {
  initialPosts: Testimonial[];
}

const TestimonialList: React.FC<TestimonialListProps> = ({ initialPosts }) => {
  const [posts, setPosts] = useState<Testimonial[]>(initialPosts);
  const [isLoading, setIsLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMore = async () => {
    setIsLoading(true);

    try {
      // The API endpoint is assumed to be '/alltestimonials' based on the pattern from BlogList
      const response = await axios.get(
        `${PRODUCTION_SERVER}/alltestimonials?_start=${posts.length}&_limit=6`,
        { headers: { sitekey: SITE_KEY } }
      );

      const newPosts: Testimonial[] = response.data?.data.content || [];

      setPosts(prevPosts => [...prevPosts, ...newPosts]);

      if (newPosts.length === 0) {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {posts.map((item, idx) => (
          <TestimonialsCard
            testimonial={item}
            key={idx}
          />
        ))}
      </div>

      {noData && (
        <p className="text-center font-bold">
          <b>No more testimonials to show!</b>
        </p>
      )}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!noData && (
        <div className="text-center">
          <button
            onClick={loadMore}
            disabled={isLoading}
            aria-label="Load more testimonials"
            className="py-[14px] px-[26px] bg-primary rounded-full text-white font-bold leading-[1] capitalize border-b-[3px] border-r-[3px] border-[#5C6554]">
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TestimonialList;
