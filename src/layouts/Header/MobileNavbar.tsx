'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SmartSearch from '@/components/SmartSearch/SmartSearch';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import { MobileNavbarProps, MenuItem } from '@/lib/types';
const MobileMenuItem: React.FC<{
  item: MenuItem;
  closeMenu: () => void;
  isOpen: boolean;
  toggleOpen: () => void;
}> = ({ item, closeMenu, isOpen, toggleOpen }) => {
  const hasChildren = item.children && item.children.length > 0;

  const baseItemClasses =
    'w-full py-1 text-left font-semibold text-headings hover:text-primary';

  const handleLinkClick = () => {
    closeMenu();
  };

  if (!hasChildren) {
    return (
      <li>
        <Link
          href={`/${item.item_slug ?? item.url_segment ?? ''}`}
          onClick={handleLinkClick}
          className={`${baseItemClasses} block`}>
          {item.item_title}
        </Link>
      </li>
    );
  }

  return (
    <li className="overflow-hidden">
      <button
        onClick={toggleOpen}
        className={`${baseItemClasses} flex justify-between items-center`}>
        <span>{item.item_title}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out grid ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}>
        <div className="overflow-hidden">
          <div className="pl-4 space-y-1 text-[15px] mt-1">
            {hasChildren && (
              <MobileMenuList
                items={item.children!}
                closeMenu={closeMenu}
              />
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

const MobileMenuList: React.FC<{
  items: MenuItem[];
  closeMenu: () => void;
}> = ({ items, closeMenu }) => {
  const [openItemId, setOpenItemId] = useState<string | number | null>(null);

  const handleToggleItem = (itemId: string | number) => {
    setOpenItemId(prevOpenId => (prevOpenId === itemId ? null : itemId));
  };

  return (
    <ul className="space-y-2">
      {items.map(item => (
        <MobileMenuItem
          key={item.id}
          item={item}
          closeMenu={closeMenu}
          isOpen={openItemId === item.id}
          toggleOpen={() => handleToggleItem(item.id)}
        />
      ))}
    </ul>
  );
};

const MobileNavbar: React.FC<MobileNavbarProps> = ({
  globalData,
  optionalData,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuData = globalData?.data?.main_menu?.menu ?? [];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isMenuOpen]);

  return (
    <div className="relative">
      <nav className="relative z-50 flex items-center justify-between p-4 bg-page-bg">
        <Link
          href="/"
          className='max-w-[60px]'
          onClick={() => setIsMenuOpen(false)}>
          <Image
            src="/logo.png"
            alt="Logo"
            title="logo"
            width={88}
            height={110}
            className="logo"
          />
        </Link>

        <div className="flex items-center gap-4">
          <a
            href={`https://wa.me/${globalData?.data?.mobile ?? ''}`}
            target="_blank"
            rel="noopener noreferrer"
            className="quick-contact flex items-center gap-2">
            <svg
              className="icon text-primary"
              width="30"
              height="30">
              <use
                xlinkHref="/icons.svg#whatsapp"
                fill="currentColor"></use>
            </svg>
            <div className="contact-info hidden sm:block">
              <div className="flex flex-col font-semibold gap-[6px]">
                <span className="leading-[1] text-[13px] text-headings">
                  Call or WhatsApp
                </span>
                <span className="leading-[1] text-primary">
                  {globalData?.data?.mobile}
                </span>
              </div>
            </div>
          </a>

          <SmartSearch optionalData={optionalData} />

          <button
            onClick={toggleMenu}
            className="text-primary text-2xl focus:outline-none"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}>
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                width={28}
                height={28}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                width={28}
                height={28}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <div
        className={`absolute top-full left-0 w-full z-40 overflow-hidden ${
          !isMenuOpen ? 'pointer-events-none' : ''
        }`}>
        <div
          className={`transition-transform duration-300 ease-in-out bg-page-bg p-4 pb-7 max-h-[calc(100vh-80px)] overflow-y-auto ${
            isMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}>
          <MobileMenuList
            items={menuData}
            closeMenu={toggleMenu}
          />

          <div className="contact-us-section mt-6 py-2 border-y-[1.5px] border-primary border-dashed">
            <div className="email flex gap-2 items-center mt-3 text-sm">
              <svg
                className="icon text-primary shrink-0"
                width="18"
                height="18">
                <use
                  xlinkHref="/icons.svg#sidepannel-mail"
                  fill="currentColor"
                />
              </svg>
              {globalData.data.email}
            </div>
            <div className="phone-number flex gap-2 items-center mt-3 text-sm">
              <svg
                className="icon text-primary shrink-0"
                width="18"
                height="18">
                <use
                  xlinkHref="/icons.svg#sidepannel-phone"
                  fill="currentColor"
                />
              </svg>
              {globalData.data.phone}
            </div>
            <div className="company-address flex gap-2 items-start mt-3 text-sm">
              <svg
                className="icon text-primary shrink-0 mt-1"
                width="18"
                height="18">
                <use
                  xlinkHref="/icons.svg#sidepannel-location"
                  fill="currentColor"
                />
              </svg>
              <span>{globalData.data.address}</span>
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={toggleMenu}
        className={`fixed inset-0 z-30 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />
    </div>
  );
};

export default MobileNavbar;
