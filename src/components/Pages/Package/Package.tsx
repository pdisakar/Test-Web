import Link from 'next/link';
import React from 'react';
import dynamic from 'next/dynamic';

import PageBanner from '@/components/Banners/PageBanner';
import BreadCrumbPackage from '@/components/BreadCrumb/BreadCrumbPackage';
import TestimonialsCard from '@/components/Cards/TestimonialsCard/TestimonialsCard';
import PrintPDF from '@/components/PrintPDF/PrintPDF';

const Accordion = dynamic(() => import('@/components/Accordion/Accordion'));
const FixedDeparture = dynamic(
  () => import('@/components/FixedDeparture/FixedDeparture')
);
const TripFaqs = dynamic(() => import('@/components/TripFaqs/TripFaqs'));
const TripGallery = dynamic(
  () => import('@/components/TripGallery/TripGallery')
);

export interface Destination {
  title: string;
}

export interface Grade {
  title: string;
}

export interface Style {
  title: string;
}

export interface Accommodation {
  title: string;
}

export interface Transportation {
  title: string;
}

export interface Media {
  id: number;
  parent_id: number;
  name: string;
  mime: string;
  extension: string;
  alt_text?: string | null;
  caption?: string;
  description?: string | null;
  size: number;
  directory: string;
  full_name: string;
  full_path: string;
  variations?: any;
  status: number;
  manageable: number;
  deleted_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface BannerItem {
  attachment_type: string;
  media_id: number;
  status: number;
  deleted_at?: string | null;
  created_at: string;
  updated_at: string;
  media: Media;
}

export interface ActiveDeparture {
  id: number;
  package_id: number;
  departure_date: string;
  departure_cost: number;
  departure_note?: string | null;
  departure_status: string;
  created_at: string;
  updated_at: string;
  package_duration?: number | string;
}

export interface ItineraryItem {
  id?: string | number;
  itinerary_title?: string | null;
  itinerary_description?: string | null;
  duration?: string | null;
  meals?: string | null;
  accommodation?: string | null;
  origin_elevation?: string | null;
  destination_elevation?: string | null;
  travel_mode?: string | null;
}

export interface Itinerary {
  details: ItineraryItem[];
}

export interface GroupFaq {
  question?: string;
  answer?: string;
  [key: string]: any;
}

export interface CarouselContent {
  id?: string | number;
  media?: Media;
  [key: string]: any;
}

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
export interface Pricegroup {
  id: number;
  package_id: number;
  min_people: number;
  max_people: number;
  unit_price: number;
  offer_unit_price: number;
  offer_label?: string | null;
}

export interface PackageData {
  banner?: any;
  banners?: BannerItem[];
  package_title: string;
  destination?: Destination;
  package_duration?: number | string;
  package_duration_type?: string;
  grade?: Grade;
  style?: Style;
  accommodation?: Accommodation;
  bestseason?: string;
  package_max_altitude?: number;
  transportation?: Transportation;
  package_group_size?: number;
  package_highlights?: string;
  package_details?: string;
  itinerary?: Itinerary;
  package_cost_includes?: string;
  package_cost_excludes?: string;
  package_trip_info?: string;
  carousel?: { content: CarouselContent[] };
  groupfaqs?: GroupFaq[];
  testimonials?: Testimonial[];
  package_extra_faqs?: string;
  active_departures?: ActiveDeparture[];
  package_abstract: string;
  group_default_price: number;
  pricegroup: Pricegroup[];
}

export interface PackageProps {
  packageData: PackageData;
  breadcrumb?: any;
}

export interface TestimonialsCardProps {
  testimonial: Testimonial;
}

const Package: React.FC<PackageProps> = ({ packageData, breadcrumb }) => {
  return (
    <main className="package-details">
      {packageData.banner && <PageBanner banner={packageData.banner} />}
      <div className="container">
        <div className="common-module mb-0 mt-4">
          <BreadCrumbPackage
            breadcrumb={breadcrumb}
            currentpage={packageData.package_title}
          />
          <div className="title">
            <h1
              dangerouslySetInnerHTML={{
                __html: packageData.package_title,
              }}></h1>
          </div>
        </div>
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="page-left lg:col-span-8 min-w-0">
            {packageData.package_abstract && (
              <div className="abstract">
                <div className="common-module">
                  <article
                    className=" px-6 py-4 bg-primary/15 leading-[180%] font-medium text-sm rounded-md"
                    dangerouslySetInnerHTML={{
                      __html: packageData.package_abstract,
                    }}
                  />
                </div>
              </div>
            )}
            <div className="package-quick-info">
              <div className="common-module">
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 [&>li>.item]:flex [&>li>.item]:gap-2 [&>li>.item>.text>.info-title]:text-sm [&>li>.item>.text>.info-title]:text-muted [&>li>.item>.text>.info]:text-headings [&>li>.item>.text>.info]:font-semibold ">
                  {packageData.destination?.title && (
                    <li>
                      <div className="item">
                        <div className="icon">
                          <svg
                            width="36"
                            height="36"
                            viewBox="0 0 24 24"
                            className="text-primary"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <use
                              xlinkHref="./icons.svg#country"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <div className="text">
                          <p className="info-title">Destination</p>
                          <span className="info">
                            {packageData.destination.title}
                          </span>
                        </div>
                      </div>
                    </li>
                  )}

                  {packageData.package_duration && (
                    <li>
                      <div className="item">
                        <div className="icon">
                          <svg
                            width="36"
                            height="36"
                            viewBox="0 0 24 24"
                            className="text-primary"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <use
                              xlinkHref="./icons.svg#durations"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <div className="text">
                          <p className="info-title">Duration</p>
                          <span className="info">
                            {packageData.package_duration}{' '}
                            {packageData.package_duration_type}
                          </span>
                        </div>
                      </div>
                    </li>
                  )}

                  {packageData.grade?.title && (
                    <li>
                      <div className="item">
                        <div className="icon">
                          <svg
                            width="36"
                            height="36"
                            viewBox="0 0 24 24"
                            className="text-primary"
                            xmlns="http://www.w3.org/2000/svg">
                            <use
                              xlinkHref="./icons.svg#grade"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <div className="text">
                          <p className="info-title">Trip Difficulty</p>
                          <span className="info">
                            {packageData.grade.title}
                          </span>
                        </div>
                      </div>
                    </li>
                  )}

                  {packageData.style?.title && (
                    <li>
                      <div className="item">
                        <div className="icon">
                          <svg
                            width="36"
                            height="36"
                            viewBox="0 0 24 24"
                            className="text-primary"
                            xmlns="http://www.w3.org/2000/svg">
                            <use
                              xlinkHref="./icons.svg#activity"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <div className="text">
                          <p className="info-title">Activity</p>
                          <span className="info">
                            {packageData.style.title}
                          </span>
                        </div>
                      </div>
                    </li>
                  )}

                  {packageData.accommodation?.title && (
                    <li>
                      <div className="item">
                        <div className="icon">
                          <svg
                            width="36"
                            height="36"
                            viewBox="0 0 24 24"
                            className="text-primary"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <use
                              xlinkHref="./icons.svg#accommodation"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <div className="text">
                          <p className="info-title">Accommodation</p>
                          <span className="info">
                            {packageData.accommodation.title}
                          </span>
                        </div>
                      </div>
                    </li>
                  )}

                  {packageData.package_max_altitude && (
                    <li>
                      <div className="item">
                        <div className="icon">
                          <svg
                            width="36"
                            height="36"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="text-primary"
                            xmlns="http://www.w3.org/2000/svg">
                            <use
                              xlinkHref="./icons.svg#altitude"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <div className="text">
                          <p className="info-title">Max Elevation</p>
                          <span className="info">
                            {packageData.package_max_altitude}m
                          </span>
                        </div>
                      </div>
                    </li>
                  )}

                  {packageData.transportation?.title && (
                    <li>
                      <div className="item">
                        <div className="icon">
                          <svg
                            width="36"
                            height="36"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="text-primary"
                            xmlns="http://www.w3.org/2000/svg">
                            <use
                              xlinkHref="./icons.svg#car"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <div className="text">
                          <p className="info-title">Transportation</p>
                          <span className="info">
                            {packageData.transportation.title}
                          </span>
                        </div>
                      </div>
                    </li>
                  )}

                  {packageData.package_group_size && (
                    <li>
                      <div className="item">
                        <div className="icon">
                          <svg
                            width="36"
                            height="36"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="text-primary"
                            xmlns="http://www.w3.org/2000/svg">
                            <use
                              xlinkHref="./icons.svg#group-size"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                        <div className="text">
                          <p className="info-title">Group Size</p>
                          <span className="info">
                            Min. {packageData.package_group_size} Pax
                          </span>
                        </div>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            {packageData.package_highlights && (
              <div className="highlight">
                <div className="common-module">
                  <div className="title">
                    <h2>Highlights</h2>
                  </div>
                  <article
                    className="highlights [&>ul>li]:relative [&>ul>li]:pl-7 [&>ul>li]:before:h-5 [&>ul>li]:before:w-5 [&>ul>li]:before:top-1 [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:content-[''] [&>ul>li]:before:bg-checkmark [&>ul>li]:before:bg-no-repeat [&>ul>li]:before:bg-cover [&>ul>li>p]:mb-3"
                    dangerouslySetInnerHTML={{
                      __html: packageData.package_highlights,
                    }}
                  />
                </div>
              </div>
            )}
            {packageData.package_details && (
              <div
                className="overview"
                id="overview">
                <div className="common-module">
                  <div className="title">
                    <h2>Overview</h2>
                  </div>
                  <article
                    id="overview"
                    className="overview"
                    dangerouslySetInnerHTML={{
                      __html: packageData.package_details,
                    }}></article>
                </div>
              </div>
            )}
            {packageData.itinerary && (
              <div
                className="package-itinerary"
                id="package-itinerary">
                <div className="common-module">
                  <div className="title">
                    <h2>Detailed Itinerary</h2>
                  </div>
                  <Accordion data={packageData.itinerary.details} />
                </div>
              </div>
            )}
            {packageData.active_departures?.length ? (
              <div
                className="departure-dates"
                id="departure-dates">
                <div className="common-module">
                  <div className="title">
                    <h2>Our Fixed Departure</h2>
                  </div>
                  <FixedDeparture
                    data={packageData.active_departures}
                    duration={packageData.package_duration}
                  />
                </div>
              </div>
            ) : null}
            {packageData.package_cost_includes && (
              <div
                className="cost-include"
                id="cost-include">
                <div className="common-module">
                  <div className="title">
                    <h2>Cost Included</h2>
                  </div>
                  <article
                    className="[&_ul]:mb-3 [&_ul>li]:mt-1.5 [&_ul>li]:leading-[170%] [&_ul>li]:relative [&_ul>li]:pl-7 [&_ul>li]:before:h-5 [&_ul>li]:before:w-5 [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-1 [&_ul>li]:before:content-[''] [&_ul>li]:before:bg-correct [&_ul>li]:before:bg-no-repeat [&_ul>li]:before:bg-cover"
                    dangerouslySetInnerHTML={{
                      __html: packageData.package_cost_includes,
                    }}
                  />
                </div>
              </div>
            )}
            {packageData.package_cost_excludes && (
              <div
                className="cost-exclude"
                id="cost-exclude">
                <div className="common-module">
                  <div className="title">
                    <h2>Cost Excluded</h2>
                  </div>
                  <article
                    className="[&_ul]:mb-3 [&_ul>li]:mt-1.5 [&_ul>li]:leading-[170%] [&_ul>li]:relative [&_ul>li]:pl-7 [&_ul>li]:before:h-5 [&_ul>li]:before:w-5 [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-1 [&_ul>li]:before:content-[''] [&_ul>li]:before:bg-incorrect [&_ul>li]:before:bg-no-repeat [&_ul>li]:before:bg-cover"
                    dangerouslySetInnerHTML={{
                      __html: packageData.package_cost_excludes,
                    }}
                  />
                </div>
              </div>
            )}
            {packageData.package_trip_info && (
              <div
                className="good-to-know"
                id="good-to-know">
                <div className="common-module p-6 bg-primary/[0.05] relative z-10 after:-z-10 after:absolute after:bg-[length:32px_auto] after:opacity-100 after:inset-0 after:bottom-[100px]">
                  <div className="title">
                    <h2>Good to Know Before</h2>
                  </div>
                  <article
                    className=""
                    dangerouslySetInnerHTML={{
                      __html: packageData.package_trip_info,
                    }}
                  />
                </div>
              </div>
            )}
            {packageData.banners?.length ? (
              <div
                className="trip-gallery"
                id="trip-gallery">
                <div className="common-module">
                  <div className="title">
                    <h2>Trip Gallery</h2>
                  </div>
                  <TripGallery data={packageData.banners} />
                </div>
              </div>
            ) : null}
            {packageData.package_extra_faqs && (
              <div
                className="trip-faqs"
                id="package-faqs">
                <div className="common-module">
                  <TripFaqs data={packageData.package_extra_faqs} />
                </div>
              </div>
            )}
            {packageData.testimonials?.length ? (
              <div
                className="trip-testimonials"
                id="testimonials">
                <div className="common-module">
                  <div className="title">
                    <h2>Traveller Review</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {packageData.testimonials.slice(0, 2).map(testimonial => (
                      <TestimonialsCard
                        key={testimonial.id}
                        testimonial={testimonial}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div className="package-card page-right lg:col-span-4">
            <div className="sticky top-6 p-6 shadow-custom-shadow rounded-lg border border-primary/10">
              <div className="default-price flex gap-3">
                <div className="icon">
                  <svg
                    width="50"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <use
                      xlinkHref="./icons.svg#stickey-price"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="price-body [&_span]:text-sm [&_span]:font-semibold [&_span]:leading-[100%] [&_p]:leading-[100%] [&_p]:text-primary [&_p]:font-black [&_p]:text-2xl">
                  <span>From</span>
                  <p>US$ {packageData.group_default_price}</p>
                  <span>per person</span>
                </div>
              </div>

              {packageData?.pricegroup?.length > 0 && (
                <div className="group-price mt-6">
                  <p className=" text-headings font-bold text-sm mb-2">
                    Group Discount Available{' '}
                  </p>
                  <ul className="space-y-2">
                    {packageData.pricegroup.map(group => (
                      <li
                        key={group.id}
                        className="flex justify-between items-center text-sm text-primary font-semibold">
                        <span>
                          {group.min_people === group.max_people
                            ? `${group.min_people} Person`
                            : `${group.min_people}-${group.max_people} People`}
                        </span>
                        <span className="">US$ {group.unit_price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="stickey-notification flex items-center justify-center mt-6">
                <div className="icon">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <use
                      xlinkHref="./icons.svg#stickey-notification"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <p className=" text-sm leading-[160%] ml-3 font-medium">
                  Secure your spot now and pay later, with no upfront payment
                  required.
                </p>
              </div>
              <div className="button-group mt-6">
                <Link
                  href="#departure-dates"
                  className="btn btn-primary flex justify-center px-6 py-2 text-[1.06275rem] rounded-lg w-full capitalize text-white bg-primary">
                  Check Availability
                </Link>
              </div>
              <div className="page-action">
                <PrintPDF
                  title={packageData.package_title}
                  itinerary={packageData.itinerary?.details || []}
                  const_include={packageData.package_cost_includes || ''}
                  cost_exclude={packageData.package_cost_excludes || ''}
                  price={packageData.group_default_price || 0}
                  duration_type={packageData.package_duration_type || 'days'}
                  package_abstract={packageData.package_abstract}
                  destination={packageData.destination}
                  package_duration={packageData.package_duration}
                  grade={packageData.grade}
                  style={packageData.style}
                  accommodation={packageData.accommodation}
                  package_max_altitude={packageData.package_max_altitude}
                  transportation={packageData.transportation}
                  package_group_size={packageData.package_group_size}
                  package_highlights={packageData.package_highlights}
                  package_details={packageData.package_details}
                  package_trip_info={packageData.package_trip_info}
                  pricegroup={packageData.pricegroup}
                  bestseason={packageData.bestseason}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Package;
