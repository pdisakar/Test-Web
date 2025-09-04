import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import cards from '../../../public/CardsWeAccept/cards.png';
import SocialMedia from '@/components/SocialMedia/SocialMedia';
import Affiliations from '@/components/Affiliations/Affiliations';
import { FooterProps, FooterMenuSection, FooterMenuChild } from '@/lib/types';

const Footer: React.FC<FooterProps> = ({ globalData }) => {
  return (
    <div className="footer-body">
      <Affiliations />
      <footer
        className="footer pb-0 common-box bg-footer-color">
        <div className="container">
          <div className="main-footer">
            <ul className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {globalData?.data.footer_menu?.menu
                ?.slice(0, 4)
                .map((section: FooterMenuSection) => (
                  <li key={section.id}>
                    <h3 className=" text-lg font-extrabold text-white/90">
                      {section.item_title}
                    </h3>
                    {section.children && section.children.length > 0 && (
                      <ul className="pt-7 space-y-3">
                        {section.children.map((child: FooterMenuChild) => (
                          <li
                            key={child.id}
                            className="text-[15px] font-medium text-white/80">
                            <Link
                              href={`/${child.url_segment}`}
                              className="hover:text-white transition-colors">
                              {child.item_title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
            </ul>
          </div>

          <div className="bottom-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 p-3 md:p-6  lg:p-12 bg-page-bg rounded-t-[30px] border border-gray-300 border-b-[2px] border-b-primary/20 [border-bottom-style:dotted]">
            <div className="about-company">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={88}
                  title="logo"
                  height={110}
                  className="logo"
                />
              </Link>
              <p className="text-[15px] leading-[190%] text-text-color/85 font-medium my-6">
                Nepal Adventure Holidays delivers thrilling treks and cultural
                tours, showcasing Himalayan beauty and authentic experiences.
              </p>
              <SocialMedia globalData={globalData} />
            </div>
            <div className="company-info">
              <h3 className=" text-xl font-bold text-headings/85">
                {globalData?.data.company_name}
              </h3>
              <ul className=" mt-6 [&>li+li]:mt-[18px] [&>li]:flex [&>li]:gap-3 font-light text-text-color/85">
                <li className="company-address">
                  <svg
                    className="icon text-primary shrink-0 mt-1"
                    width="22"
                    height="22">
                    <use
                      xlinkHref="/icons.svg#footer-location"
                      fill="currentColor"
                    />
                  </svg>
                  <div className="company-address-details">
                    <p className="text-sm">Address</p>
                    <p className="font-medium">{globalData?.data.address}</p>
                  </div>
                </li>
                <li className="company-phone">
                  <svg
                    className="icon text-primary shrink-0 mt-1"
                    width="22"
                    height="22">
                    <use
                      xlinkHref="/icons.svg#footer-call"
                      fill="currentColor"
                    />
                  </svg>
                  <div className="company-phone-details">
                    <p className="text-sm">Contact Number</p>
                    <p className="font-medium">{globalData?.data.phone}</p>
                  </div>
                </li>
                <li className="company-email">
                  <svg
                    className="icon text-primary shrink-0 mt-1"
                    width="22"
                    height="22">
                    <use
                      xlinkHref="/icons.svg#footer-mail"
                      fill="currentColor"
                    />
                  </svg>
                  <div className="company-mail-details flex flex-col break-words">
                    <p className="text-sm">Mail Us</p>
                    <a
                      className="font-medium break-all"
                      href={`mailto:${globalData?.data.email}`}>
                      <span>{globalData?.data.email}</span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
            <div className="news-letter md:col-span-3 lg:col-span-1">
              <div className="newsletter-title">
                <h3 className=" text-xl font-bold text-headings/85">
                  Subscribe to our newspaper
                </h3>
                <p className="text-[13px] leading-[190%] text-text-color/85 font-medium my-4">
                  We provide the expertise and support to propel your business
                  forward.
                </p>
              </div>
              <form className="w-full">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-primary/85 bg-primary/10 placeholder:text-primary/80 font-light focus:border-primary focus:outline-none rounded-full px-6 py-[10px] text-[15px] mt-[10px]"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full border border-primary/85 bg-primary/10 placeholder:text-primary/80 font-light focus:border-primary focus:outline-none rounded-full px-6 py-[10px] text-[15px] mt-[10px]"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center w-fit mt-[10px] group"
                  aria-label="Subscribe Now">
                  <span className="py-[14px] px-[26px] bg-primary rounded-full text-white font-bold leading-[1] capitalize border-b-[3px] border-r-[3px] border-[#5C6554]">
                    Subscribe Now
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </footer>
      <div className="copy-right container text-center pt-12 pb-12">
        <div className="we-accept mx-auto">
          <p className=" text-xl text-headings font-bold uppercase">
            We accept{' '}
          </p>
          <figure className="card-we-accept w-[292px] mx-auto mt-[14px]">
            <Image
              src={cards}
              alt="Cards We Accept"
              title="Cards We Accept"
              width={292}
              height={32.67}
              className="w-full h-auto"
            />
          </figure>
        </div>
        <p className=" mt-6 max-w-[711px] mx-auto text-text-color/85 text-[15px] font-medium leading-[190%]">
          All content on this website, including photographs, is exclusively
          owned by Nepal Adventure Holidays Pvt. Ltd., and reproduction without
          our explicit permission is prohibited. © Nepal Adventure Holidays Pvt.
          Ltd 2025.
        </p>
      </div>
      <Image
        src="/footer.svg"
        alt="Footer illustration"
        title="footer svg"
        width={1920}
        height={400}
        priority
      />
    </div>
  );
};

export default Footer;
