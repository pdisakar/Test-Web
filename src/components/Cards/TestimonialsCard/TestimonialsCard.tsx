import React from 'react';
import { format } from 'date-fns';
import { TestimonialsCardProps } from '@/lib/types';

const TestimonialsCard: React.FC<TestimonialsCardProps> = ({ testimonial }) => {
  return (
    <div className="testimonial-card shadow-custom-shadow rounded-xl py-4 md:py-8 h-fit">
      <div className="title-section mb-6 px-4 md:px-11">
        <svg
          className="icon text-primary mb-2"
          width="82"
          height="14">
          <use
            xlinkHref={`/icons.svg#fivestar`}
            fill="currentColor"
          />
        </svg>
        <h3 className="text-headings text-xl font-semibold leading-[130%] pb-4">
          {testimonial.urlinfo?.url_title}
        </h3>

        <article
          className="custom-scrollbar"
          dangerouslySetInnerHTML={{ __html: testimonial.review || '' }}
        />
      </div>
      <div className="about-author mt-6 pt-6 border-t border-border">
        <div className="flex items-center px-4 md:px-11">
          <div className="author-img mr-2 w-[48px] h-[48px] flex items-center justify-center font-bold bg-primary/10 text-primary rounded-full text-[22px] shrink-0">
            {testimonial.full_name?.charAt(0).toUpperCase()}
          </div>

          <div className="other-info flex flex-col">
            <span className="author-name capitalize text-headings text-[15px] font-semibold">
              {testimonial.full_name}
            </span>
            <span className="testimonials-date text-xs text-muted font-semibold">
              {testimonial.review_date ? format(new Date(testimonial.review_date), 'dd MMM yyyy') : ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCard;
