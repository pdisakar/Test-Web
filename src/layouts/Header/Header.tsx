import React from 'react';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';
import Notification from '../Notification/Notification';
import { HeaderProps } from '@/lib/types';

const Header: React.FC<HeaderProps> = ({ globalData, optionalData }) => {
  return (
    <div
      className="header relative bg-page-bg"
      id="header">
      <div className="desktop-header hidden lg:block">
        <Notification message={globalData?.data?.notification} />

        <DesktopNavbar
          globalData={globalData}
          optionalData={optionalData}
        />
      </div>

      <div className="mobile-header lg:hidden">
        <MobileNavbar
          globalData={globalData}
          optionalData={optionalData}
        />
      </div>
    </div>
  );
};

export default Header;
