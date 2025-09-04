import React from 'react';
import Link from 'next/link';
import { BreadCrumbProps } from '@/lib/types';

const BreadCrumb = ({ breadcrumb }: BreadCrumbProps) => {
  if (!breadcrumb || !breadcrumb[0] || breadcrumb[0].length === 0) return null;

  const breadcrumbItems = breadcrumb[0];
  const lastItem = breadcrumbItems[breadcrumbItems.length - 1];

  return (
    <div className="breadcrumb-container">
      <nav aria-label="breadcrumb">
        <ul className="flex flex-wrap items-center text-[13px] font-semibold text-muted [&>li:last-child]:text-primary">
          <li className="flex items-center">
            <Link href="/">Home</Link>
            <span className='px-1'>/</span>
          </li>

          <li className="flex items-center">
            <span aria-current="page">{lastItem.title}</span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default BreadCrumb;
