'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { SidePanelProps } from '@/lib/types';

const SidePanel: React.FC<SidePanelProps> = ({ globalData }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <button
        className="more-info flex items-center gap-2"
        onClick={() => setIsOpen(true)}
        aria-label="Open Side Panel">
        <svg
          className="icon text-primary"
          width="32"
          height="32">
          <use
            xlinkHref="/icons.svg#header-more-info"
            fill="currentColor"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-30 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`
          fixed top-0 right-0 w-[500px] h-screen bg-page-bg shadow-lg z-40
          transform transition-transform duration-300 ease-in-out overflow-y-auto
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        style={{ maxHeight: '100vh' }}
        onClick={e => e.stopPropagation()}>
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-5 text-xl font-semibold text-primary"
          aria-label="Close Side Panel">
          ✕
        </button>

        <div className="p-6">
          <Image
            src="/logo.png"
            alt="Logo"
            title="logo"
            width={88}
            height={110}
            className="logo mb-8"
          />

          <div className="sidepanner-body">
            <div className="contact-us-section my-6 py-6 border-y-[1.5px] border-primary border-dashed">
              <h3 className="text-headings text-xl font-bold">Contact Us</h3>

              {globalData.data.email && (
                <div className="email flex gap-3 mt-3">
                  <svg
                    className="icon text-primary shrink-0"
                    width="24"
                    height="24">
                    <use
                      xlinkHref="/icons.svg#sidepannel-mail"
                      fill="currentColor"
                    />
                  </svg>
                  {globalData.data.email}
                </div>
              )}

              {(globalData.data.mobile || globalData.data.phone) && (
                <div className="phone-number flex gap-3 mt-3">
                  <svg
                    className="icon text-primary shrink-0"
                    width="24"
                    height="24">
                    <use
                      xlinkHref="/icons.svg#sidepannel-phone"
                      fill="currentColor"
                    />
                  </svg>
                  {globalData.data.mobile ?? globalData.data.phone}
                </div>
              )}

              {globalData.data.address && (
                <div className="company-address flex gap-3 mt-3">
                  <svg
                    className="icon text-primary shrink-0"
                    width="24"
                    height="24">
                    <use
                      xlinkHref="/icons.svg#sidepannel-location"
                      fill="currentColor"
                    />
                  </svg>
                  {globalData.data.address}
                </div>
              )}
            </div>

            <PrimaryButton
              href="/contact-us"
              label="Book Now"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SidePanel;
