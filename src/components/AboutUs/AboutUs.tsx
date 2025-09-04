import React from 'react';
import PrimaryButton from '../Buttons/PrimaryButton';
import Image from 'next/image';
import aboutus1 from '../../../public/AboutUs/aboutus1.webp';

const features = [
  'Safety First, Always Guaranteed',
  'Trusted Travel Guide Service',
  'Expertise and experience',
  'time and stress savings',
];

interface AboutUsData {
  page_title?: string;
  page_description?: string;
}

interface AboutUsProps {
  data: AboutUsData;
}

const AboutUs: React.FC<AboutUsProps> = ({ data }) => {
  return (
    <div className="about-us common-box pt-0">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="about-us-body">
          <div className="about-us-section">
            <div className="title">
              <span className="!justify-start">
                <svg
                  className="icon"
                  width="26"
                  height="28"
                  fill="currentColor">
                  <use xlinkHref="/icons.svg#title-top" />
                </svg>
                Made Just For You
              </span>
              <h1
                className="company_title"
                dangerouslySetInnerHTML={{ __html: data?.page_title ?? '' }}
              />
            </div>
            <article
              className="description"
              dangerouslySetInnerHTML={{ __html: data?.page_description ?? '' }}
            />
          </div>

          <div className="feature-section mt-[18px] flex flex-col gap-6 md:flex-row md:items-center">
            <ul className="features-list grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const slug = feature
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/(^-|-$)/g, '');

                return (
                  <li
                    key={index}
                    className="feature-item flex items-center gap-[15px] px-6 py-3 bg-[#FFF9E2] first:bg-primary/10 last:bg-primary/10 rounded-2xl">
                    <i className="h-[56px] w-[56px] flex items-center justify-center rounded-full bg-white shrink-0">
                      <svg
                        className="text-primary shrink-0"
                        width="26"
                        height="26"
                        fill="currentColor">
                        <use xlinkHref={`/icons.svg#${slug}`} />
                      </svg>
                    </i>
                    <span className="font-bold text-headings">{feature}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-8">
            <PrimaryButton
              href="/about-us"
              label="Read More About Us"
            />
          </div>
        </div>

        <div className="about-us-media hidden lg:block relative">
          <figure className="image-slot before:aspect-[628/560] w-full">
            <Image
              src={aboutus1}
              alt="Hero"
              width={628}
              height={560}
              title="Home Banner"
              className="object-cover bg-page-bg"
              sizes="(max-width: 628px) 100vw, 628px"
              priority
            />
          </figure>
          <figcaption className="bg-primary w-fit text-white flex items-center justify-center gap-2 py-2 px-3 absolute bottom-6 rounded-[10px] border-4 border-page-bg right-0 z-10">
            <p className="text-[35px] leading-1 font-bold">05</p>
            <p className="text-semibold leading-[19px]">
              Years of <br /> experience
            </p>
          </figcaption>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
