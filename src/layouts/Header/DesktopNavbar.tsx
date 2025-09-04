'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SidePanel from '../SidePannel/SidePanel';
import SmartSearch from '@/components/SmartSearch/SmartSearch';
import { DesktopNavbarProps } from '@/lib/types';

const DesktopNavbar: React.FC<DesktopNavbarProps> = ({
  globalData,
  optionalData,
}) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const menuData = globalData?.data?.main_menu?.menu ?? [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = (menuTitle: string) =>
    setOpenMenu(prev => (prev === menuTitle ? null : menuTitle));

  return (
    <nav
      ref={navRef}
      className="container flex items-center justify-between bg-page-bg ">
      <div className="flex text-headings">
        <Link
          href="/"
          className="navbar-brand text-[0] relative z-[11] max-w-[87.32px] max-h-[20px] block before:absolute before:-top-7 before:-right-7 before:-bottom-[120px] before:left-[-9999px] before:bg-page-bg before:rounded-br-[40px] before:-z-10 before:shadow-custom-shadow">
          <Image
            src="/logo.png"
            alt="Logo"
            title="logo"
            width={88}
            height={110}
            className="logo"
          />
        </Link>

        <ul className="flex gap-4 text-heading font-semibold text-[17px] ml-11 items-center justify-between">
          {menuData.map(menu => {
            const hasChildren = (menu.children?.length ?? 0) > 0;
            const isOpen = openMenu === menu.item_title;

            if (!hasChildren) {
              return (
                <li key={menu.id}>
                  <Link
                    href={`/${menu.item_slug ?? ''}`}
                    className="flex items-center group"
                    onClick={() => setOpenMenu(null)}>
                    {menu.item_title}
                  </Link>
                </li>
              );
            }

            const isMega =
              hasChildren &&
              (menu.children?.some(
                child => (child.children?.length ?? 0) > 0
              ) ??
                false);

            const isSimpleDropdown = hasChildren && !isMega;

            return (
              <li
                key={menu.id}
                className={isMega ? 'static' : 'relative'}>
                <button
                  onClick={() => toggleMenu(menu.item_title)}
                  className="flex items-center group">
                  {menu.item_title}
                  <svg
                    className="icon text-primary ml-2 group-hover:rotate-180 transition-transform duration-200"
                    width="14"
                    height="7">
                    <use
                      xlinkHref="/icons.svg#navbar-arrow"
                      fill="currentColor"
                    />
                  </svg>
                </button>

                {isMega && (
                  <div
                    className={`absolute custom-scrollbar container top-full left-1/2 -translate-x-1/2 bg-page-bg shadow-md p-6 rounded-lg z-40 max-h-[700px] overflow-y-auto transition-all duration-300 ease-out origin-top ${
                      isOpen
                        ? 'opacity-100 scale-100'
                        : 'pointer-events-none opacity-0 scale-95'
                    }`}>
                    <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
                      {menu.children?.map(category => (
                        <div
                          key={category.id}
                          className="break-inside-avoid">
                          <p className="font-bold text-primary mb-2">
                            {category.item_title}
                          </p>
                          <ul className="space-y-1">
                            {category.children?.map(item => (
                              <li key={item.id}>
                                <Link
                                  href={`/${item.url_segment ?? ''}`}
                                  className="hover:text-primary text-sm font-medium text-text-color"
                                  onClick={() => setOpenMenu(null)}>
                                  {item.item_title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {isSimpleDropdown && (
                  <ul
                    className={`rounded-lg absolute left-0 top-[calc(100%+16px)] z-40 min-w-[250px] bg-page-bg shadow-lg p-4 space-y-2 transition-all duration-300 ease-out origin-top ${
                      isOpen
                        ? 'opacity-100 scale-100'
                        : 'pointer-events-none opacity-0 scale-95'
                    }`}>
                    {menu.children?.map(item => (
                      <li key={item.id}>
                        <Link
                          href={`/${item.url_segment ?? ''}`}
                          className="hover:text-primary text-sm font-medium text-text-color"
                          onClick={() => setOpenMenu(null)}>
                          {item.item_title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="quick-access flex items-center gap-6 py-6">
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
          <div className="contact-info font-semibold flex flex-col gap-[6px]">
            <span className="leading-[1] text-[13px] text-headings">
              Call or WhatsApp
            </span>
            <span className="leading-[1] text-primary">
              {globalData?.data?.mobile}
            </span>
          </div>
        </a>

        <SmartSearch optionalData={optionalData} />
        <SidePanel globalData={globalData} />
      </div>
    </nav>
  );
};

export default DesktopNavbar;








// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import SidePanel from '../SidePannel/SidePanel';
// import SmartSearch from '@/components/SmartSearch/SmartSearch';
// import { DesktopNavbarProps } from '@/lib/types';

// const MegaMenuContent: React.FC<{
//   menu: any;
//   setOpenMenu: (arg: null) => void;
// }> = ({ menu, setOpenMenu }) => {
//   const [activeTab, setActiveTab] = useState(menu.children?.[0]?.id ?? null);

//   return (
//     <div className="flex gap-6">
//       <div className="w-1/4 pr-5 border-r border-primary/20">
//         <ul className="space-y-1">
//           {menu.children?.map((category: any) => (
//             <li key={category.id}>
//               <button
//                 onClick={() => setActiveTab(category.id)}
//                 className={`w-full text-left p-2 rounded-md text-sm transition-colors duration-200 ${
//                   activeTab === category.id
//                     ? 'bg-primary/20 text-primary'
//                     : 'hover:bg-gray-100 text-headings'
//                 }`}>
//                 {category.item_title}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="w-3/4 pl-5">
//         {menu.children?.map(
//           (category: any) =>
//             activeTab === category.id && (
//               <div key={category.id}>
//                 <p className="font-bold text-primary mb-4 text-lg">
//                   {category.item_title}
//                 </p>
//                 <ul className="columns-2 md:columns-3 gap-6 space-y-2">
//                   {category.children?.map((item: any) => (
//                     <li
//                       key={item.id}
//                       className="break-inside-avoid">
//                       <Link
//                         href={`/${item.url_segment ?? ''}`}
//                         className="hover:text-primary text-sm font-medium text-text-color block p-1"
//                         onClick={() => setOpenMenu(null)}>
//                         {item.item_title}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )
//         )}
//       </div>
//     </div>
//   );
// };

// const DesktopNavbar: React.FC<DesktopNavbarProps> = ({
//   globalData,
//   optionalData,
// }) => {
//   const [openMenu, setOpenMenu] = useState<string | null>(null);
//   const navRef = useRef<HTMLDivElement>(null);
//   const menuData = globalData?.data?.main_menu?.menu ?? [];

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (navRef.current && !navRef.current.contains(event.target as Node)) {
//         setOpenMenu(null);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const toggleMenu = (menuTitle: string) =>
//     setOpenMenu(prev => (prev === menuTitle ? null : menuTitle));

//   return (
//     <nav
//       ref={navRef}
//       className="container flex items-center justify-between bg-page-bg ">
//       <div className="flex text-headings">
//         <Link
//           href="/"
//           className="navbar-brand text-[0] relative z-[11] max-w-[87.32px] max-h-[20px] block before:absolute before:-top-7 before:-right-7 before:-bottom-[120px] before:left-[-9999px] before:bg-page-bg before:rounded-br-[40px] before:-z-10 before:shadow-custom-shadow">
//           <Image
//             src="/logo.png"
//             alt="Logo"
//             title="logo"
//             width={88}
//             height={110}
//             className="logo"
//           />
//         </Link>

//         <ul className="flex gap-4 text-heading font-semibold text-[17px] ml-11 items-center justify-between">
//           {menuData.map((menu: any) => {
//             const hasChildren = (menu.children?.length ?? 0) > 0;
//             const isOpen = openMenu === menu.item_title;

//             if (!hasChildren) {
//               return (
//                 <li key={menu.id}>
//                   <Link
//                     href={`/${menu.item_slug ?? ''}`}
//                     className="flex items-center group"
//                     onClick={() => setOpenMenu(null)}>
//                     {menu.item_title}
//                   </Link>
//                 </li>
//               );
//             }

//             const isMega =
//               hasChildren &&
//               (menu.children?.some(
//                 (child: any) => (child.children?.length ?? 0) > 0
//               ) ??
//                 false);

//             const isSimpleDropdown = hasChildren && !isMega;

//             return (
//               <li
//                 key={menu.id}
//                 className={isMega ? 'static' : 'relative'}>
//                 <button
//                   onClick={() => toggleMenu(menu.item_title)}
//                   className="flex items-center group">
//                   {menu.item_title}
//                   <svg
//                     className={`icon text-primary ml-2 group-hover:rotate-180 transition-transform duration-200 ${
//                       isOpen ? 'rotate-180' : ''
//                     }`}
//                     width="14"
//                     height="7">
//                     <use
//                       xlinkHref="/icons.svg#navbar-arrow"
//                       fill="currentColor"
//                     />
//                   </svg>
//                 </button>

//                 {isMega && (
//                   <div
//                     className={`absolute custom-scrollbar container top-full left-1/2 -translate-x-1/2 bg-page-bg shadow-md p-4 rounded-lg z-40 max-h-[700px] overflow-y-auto transition-all duration-300 ease-out origin-top ${
//                       isOpen
//                         ? 'opacity-100 scale-100'
//                         : 'pointer-events-none opacity-0 scale-95'
//                     }`}>
//                     <MegaMenuContent
//                       menu={menu}
//                       setOpenMenu={setOpenMenu}
//                     />
//                   </div>
//                 )}

//                 {isSimpleDropdown && (
//                   <ul
//                     className={`rounded-lg absolute left-0 top-[calc(100%+16px)] z-40 min-w-[250px] bg-page-bg shadow-lg p-4 space-y-2 transition-all duration-300 ease-out origin-top ${
//                       isOpen
//                         ? 'opacity-100 scale-100'
//                         : 'pointer-events-none opacity-0 scale-95'
//                     }`}>
//                     {menu.children?.map((item: any) => (
//                       <li key={item.id}>
//                         <Link
//                           href={`/${item.url_segment ?? ''}`}
//                           className="hover:text-primary text-sm font-medium text-text-color block px-2 py-1"
//                           onClick={() => setOpenMenu(null)}>
//                           {item.item_title}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </li>
//             );
//           })}
//         </ul>
//       </div>

//       <div className="quick-access flex items-center gap-6 py-6">
//         <a
//           href={`https://wa.me/${globalData?.data?.mobile ?? ''}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="quick-contact flex items-center gap-2">
//           <svg
//             className="icon text-primary"
//             width="30"
//             height="30">
//             <use
//               xlinkHref="/icons.svg#whatsapp"
//               fill="currentColor"></use>
//           </svg>
//           <div className="contact-info font-semibold flex flex-col gap-[6px]">
//             <span className="leading-[1] text-[13px] text-headings">
//               Call or WhatsApp
//             </span>
//             <span className="leading-[1] text-primary">
//               {globalData?.data?.mobile}
//             </span>
//           </div>
//         </a>

//         <SmartSearch optionalData={optionalData} />
//         <SidePanel globalData={globalData} />
//       </div>
//     </nav>
//   );
// };

// export default DesktopNavbar;

