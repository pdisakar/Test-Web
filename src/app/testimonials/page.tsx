import React from 'react';
import { getAllTestimonials } from '@/services/network_requests';
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb';
import TestimonialList from '@/components/TestimonialList/TestimonialList';

export interface Testimonial {
  id?: string | number;
  full_name: string;
  review_date: string | Date;
  review: string;
  urlinfo: {
    url_title: string;
  };
  [key: string]: any;
}

export interface TestimonialPageData {
  content: Testimonial[];
  [key: string]: any;
}

const Page: React.FC = async () => {
  const response = await getAllTestimonials();

  const data: TestimonialPageData = response.data.data;
  const initialData: Testimonial[] = data.content;

  const breadcrumb = [
    [
      {
        title: 'Testimonials',
        slug: 'testimonials',
      },
    ],
  ];

  return (
    <div className="testimonial-body">
      <div className="common-box">
        <div className="container">
          <div className="common-module">
            <div className="flex justify-center">
              <BreadCrumb breadcrumb={breadcrumb} />
            </div>
            <div className="title text-center">
              <h1>All Testimonials</h1>
            </div>
          </div>
          <TestimonialList initialPosts={initialData} />
        </div>
      </div>
    </div>
  );
};

export default Page;
