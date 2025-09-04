import PageBanner, { BannerData } from '@/components/Banners/PageBanner';
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb';
import CategoryCard from '@/components/Cards/CategoryCard/CategoryCard';
import PackageCard from '@/components/Cards/PackageCard/PackageCard';
import React from 'react';
import { CategoryProps } from '@/lib/types';

export default function Category({ categoryData, breadcrumb }: CategoryProps) {
  return (
    <div className="category-details">
      {categoryData.banner && <PageBanner banner={categoryData.banner} />}

      {categoryData.description && (
        <div className="common-box">
          <div className="container">
            <div className="common-module mb-0">
              <div className=" flex justify-center">
                <BreadCrumb breadcrumb={breadcrumb} />
              </div>
              <div className="title text-center">
                <h1
                  dangerouslySetInnerHTML={{ __html: categoryData.title || '' }}></h1>
              </div>
            </div>

            {categoryData.description && (
              <article
                className="text-center mx-auto"
                dangerouslySetInnerHTML={{ __html: categoryData.description }}
              />
            )}
          </div>
        </div>
      )}

      {categoryData.children && categoryData.children.length > 0 && (
        <div className="package-list-container bg-secondary/10">
          <div className="common-box">
            <div className="container">
              <div className="title text-center">
                <h2>Available Activities</h2>
                <div className="flex items-center gap-2 mx-auto justify-center text-[15px] text-primary">
                  <p className="text-bold">{categoryData.title}: </p>
                  <p>{categoryData.children.length} Activities</p>
                </div>
              </div>
              <ul className="package-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {categoryData.children.map((category: any, index: number) => (
                  <CategoryCard
                    key={index}
                    category={category}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {categoryData.packages && categoryData.packages.length > 0 && (
        <div className="package-list-container bg-secondary/10">
          <div className="common-box">
            <div className="container">
              <div className="title text-center">
                <h2>{categoryData.title}</h2>
                <div className="flex items-center gap-2 mx-auto justify-center text-[15px] text-primary">
                  <p className="text-bold">Available Packages: </p>
                  <p>{categoryData.packages.length} Packages</p>
                </div>
              </div>

              <div className="package-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {categoryData.packages.map((pkg: any, index: number) => (
                  <PackageCard
                    key={index}
                    pkg={pkg}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
