import React from 'react';
import TestimonialsCard from '../Cards/TestimonialsCard/TestimonialsCard';
import PrimaryButton from '../Buttons/PrimaryButton'; // Adjust the path if needed
import { FeaturedTestimonialsProps } from '@/lib/types';

const FeaturedTestimonials: React.FC<FeaturedTestimonialsProps> = ({
  limit,
  data,
}) => {
  return (
    <div className="featured-testimonials common-box pt-0">
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
            Reviews
          </span>
          <h2 className="text-center mx-auto">Our Satisfied Customers </h2>
          <p className="text-center mx-auto">
            Customer reviews showcase memorable experiences, excellent service,
            and satisfaction, guiding future travelers to choose confidently.
          </p>
        </div>
        <div className="mt-8 card-body grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data?.slice(0, limit).map(testimonial => (
            <TestimonialsCard
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))}
        </div>
        <div className="action-btn relative flex justify-center mt-12 after:absolute after:top-1/2 after:left-1/2 after:-translate-y-1/2 after:-translate-x-1/2 after:content-[''] after:w-full after:h-[1px] after:bg-dottedline after:-z-10">
          <PrimaryButton
            href="/testimonials"
            label="Read All Reviews"
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedTestimonials;
