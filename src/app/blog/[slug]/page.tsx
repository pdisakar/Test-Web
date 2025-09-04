import React from 'react';
import { notFound } from 'next/navigation';
import { getBlogBySlug, getStaticRoutes } from '@/services/network_requests';
import PageBanner from '@/components/Banners/PageBanner';
import { format } from 'date-fns';
import BreadCrumbPackage from '@/components/BreadCrumb/BreadCrumbPackage';

interface BlogAuthor {
  name?: string;
}

interface BlogContent {
  title: string;
  content: string;
  blog_date: string | Date;
  authors?: BlogAuthor[];
  banner?: { full_path: string };
  urlinfo?: { url_slug: string };
  meta?: {
    meta_title?: string;
    meta_description?: string;
  };
  [key: string]: any;
}

interface ParamsPromise {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ParamsPromise) {
  const { slug } = await params;

  let res;
  try {
    res = await getBlogBySlug(slug);
  } catch (err: any) {
    if (err.response?.status === 404) return notFound();
    throw err;
  }

  const data: { content: BlogContent } | undefined = res.data?.data;
  if (!data || !data.content) return notFound();

  const content = data.content;
  const meta = content.meta;
  const slugFromData = content.urlinfo?.url_slug || slug;
  const bannerUrl = content.banner?.full_path;
  const siteUrl = process.env.CANONICAL_BASE || '';

  return {
    title: meta?.meta_title || content.title,
    description: meta?.meta_description || '',
    alternates: {
      canonical: `${siteUrl}/blog/${slugFromData}`,
    },
    openGraph: {
      title: meta?.meta_title || content.title,
      description: meta?.meta_description || '',
      url: `${siteUrl}/blog/${slugFromData}`,
      ...(bannerUrl && {
        images: [
          {
            url: `${process.env.IMAGE_URL}${bannerUrl}`,
            width: 1200,
            height: 600,
          },
        ],
      }),
    },
  };
}

export const revalidate = 60; 


export async function generateStaticParams() {
  const data = await getStaticRoutes();

  if (!Array.isArray(data)) {
    return [];
  }

  const excludedSlugs = [
    'blog',
    'booking',
    'trip-booking',
    'author',
    'contact-us',
    'checkout',
    'plan-your-trip',
    'about-us',
    'customize-trip',
    'nabil-payment-cancelled',
    'nabil-payment-complete',
    'nabil-payment-declined',
    'online-booking',
    'online-payment',
    'package',
    'review',
    'story',
    'team',
    'thank-you',
    'thank-you-inquiry',
    'sitemap',
    'reviews',
    'luxury-trekking',
    'travel-guide',
    'our-teams',
    'our-team',
    'authors',
  ];

  return data
    .filter(({ slug }) => !excludedSlugs.includes(slug))
    .map(({ slug }) => ({ slug }));
}

const Page = async ({ params }: ParamsPromise) => {
  const { slug } = await params;

  let res;
  try {
    res = await getBlogBySlug(slug);
  } catch (err: any) {
    if (err.response?.status === 404) return notFound();
    throw err;
  }

  const data: BlogContent | undefined = res.data?.data?.content;
  if (!data) return notFound();

  const bannerData = data.banner;

  const breadcrumb = {
    '1': [
      {
        title: 'Blog',
        slug: 'blog',
      },
    ],
  };

  return (
    <div className="blog-page">
      {bannerData && <PageBanner banner={bannerData} />}
      <div className="container">
        <div className="main-container lg:w-4/5 lg:mx-auto">
          <div className="pt-8 pb-4">
            <div className="common-module mb-0">
              <BreadCrumbPackage
                breadcrumb={breadcrumb}
                currentpage={data.title}
              />
              <div className="title">
                <h1>{data.title}</h1>
              </div>
            </div>
            <div className="blog-author-details text-sm text-muted flex items-center justify-between py-3 border-y border-border border-dashed mt-2">
              <div className="author flex items-center">
                <div className="w-[32px] h-[32px] border border-primary rounded-full p-[2px] shrink-0 mr-2">
                  <div className="author-img h-full w-full flex items-center justify-center bg-primary/25 text-primary rounded-full text-lg">
                    {data.authors?.[0]?.name?.charAt(0).toUpperCase() || '?'}
                  </div>
                </div>
                Written by {data.authors?.[0]?.name || 'Unknown Author'}
              </div>
              <p className="blog-date mt-2">
                {format(new Date(data.blog_date), 'dd MMM yyyy')}
              </p>
            </div>
          </div>
          <article
            dangerouslySetInnerHTML={{
              __html: data.content,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
