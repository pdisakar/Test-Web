import React from 'react';
import Link from 'next/link';
import { BreadCrumbPackageProps } from '@/lib/types';

const BreadCrumbPackage = ({
  breadcrumb,
  currentpage,
}: BreadCrumbPackageProps) => {
  const breadcrumbItems = breadcrumb[Object.keys(breadcrumb)[0]] || [];

  return (
    <div className="breadcrumb-container">
      <nav aria-label="breadcrumb">
        <ul className="flex flex-wrap items-center text-[13px] font-semibold text-muted [&>li:last-child]:text-primary">
          <li className="flex items-center">
            <Link href="/">Home</Link>
            {(breadcrumbItems.length > 0 || currentpage) && (
              <span className="px-1">/</span>
            )}
          </li>

          {breadcrumbItems.map((item, index) => (
            <li
              key={index}
              className="flex items-center">
              <Link href={`/${item.slug}`}>{item.title}</Link>
              <span className="px-1">/</span>
            </li>
          ))}

          {currentpage && (
            <li className="flex items-center">
              <span aria-current="page">{currentpage}</span>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default BreadCrumbPackage;
