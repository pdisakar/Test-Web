import React from 'react';
import { getBlogPage } from '@/services/network_requests';
import BlogList from '@/components/BlogList/BlogList';
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb';

const IMAGE_URL = process.env.IMAGE_URL || '';
const CANONICAL_BASE = process.env.CANONICAL_BASE || '';

export interface BlogAuthor {
  name?: string;
}

export interface UrlInfo {
  url_slug: string;
}

export interface FeaturedImage {
  full_path: string;
}

export interface Blog {
  id: string | number;
  title: string;
  urlinfo: UrlInfo;
  featured?: FeaturedImage;
  authors?: BlogAuthor[];
  blog_date: string | Date;
  [key: string]: any;
}

export interface PageContentMeta {
  meta_title?: string;
  meta_description?: string;
}

export interface PageContent {
  page_title: string;
  page_description?: string;
  meta?: PageContentMeta;
  urlinfo: UrlInfo;
  banner?: FeaturedImage;
  [key: string]: any;
}

export interface BlogPageData {
  pagecontent: PageContent;
  listcontent: Blog[];
  [key: string]: any;
}

export async function generateMetadata(): Promise<any> {
  const response = await getBlogPage();
  const data: BlogPageData = response.data.data;

  const metaTitle =
    data.pagecontent?.meta?.meta_title ||
    data.pagecontent?.page_title ||
    'Our Blog';
  const metaDescription =
    data.pagecontent?.meta?.meta_description ||
    data.pagecontent?.page_description ||
    '';

  const canonicalUrl = `${CANONICAL_BASE}/blog`;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      ...(data.pagecontent?.banner && {
        images: [
          {
            url: IMAGE_URL + data.pagecontent.banner.full_path,
            width: 1200,
            height: 600,
          },
        ],
      }),
    },
  };
}

const Page: React.FC = async () => {
  const response = await getBlogPage();
  const data: BlogPageData = response.data.data;
  const initialData: Blog[] = data.listcontent;

  const breadcrumb = [
    [
      {
        title: 'Blog',
        slug: 'blog',
      },
    ],
  ];

  return (
    <div className="blog-body">
      <div className="common-box">
        <div className="container">
          <div className="common-module">
            <div className=" flex justify-center">
              <BreadCrumb breadcrumb={breadcrumb} />
            </div>
            <div className="title text-center">
              <h1
                dangerouslySetInnerHTML={{
                  __html: data.pagecontent.page_title || 'Our Blog',
                }}
              />
            </div>
          </div>
          <BlogList initialPosts={initialData} />
        </div>
      </div>
    </div>
  );
};

export default Page;
