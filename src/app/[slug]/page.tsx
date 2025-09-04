import { notFound } from 'next/navigation';
import { getArticle, getStaticRoutes } from '@/services/network_requests';
import Package from '@/components/Pages/Package/Package';
import Category from '@/components/Pages/Category/Category';
import Article from '@/components/Pages/Article/Article';

import type { Metadata } from 'next';

const CANONICAL_BASE = process.env.CANONICAL_BASE || '';
const IMAGE_URL = process.env.IMAGE_URL || '';

interface PageParams {
  params: Promise<{ slug: string }>;
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

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { slug } = await params;

  let articleResponse;
  try {
    articleResponse = await getArticle(slug);
  } catch (err: any) {
    if (err.response?.status === 404) return notFound();
    throw err;
  }

  const data = articleResponse?.data?.data;
  if (!data) return notFound();

  const meta = data.content?.meta;
  const banner = data.content?.banner?.full_path;

  return {
    title: meta?.meta_title || 'Untitled',
    description: meta?.meta_description || '',
    alternates: {
      canonical: `${CANONICAL_BASE}/${slug}`,
    },
    openGraph: {
      title: meta?.meta_title || 'Untitled',
      description: meta?.meta_description || '',
      url: `${CANONICAL_BASE}/${slug}`,
      ...(banner && {
        images: [
          {
            url: `${IMAGE_URL}${banner}`,
            width: 1200,
            height: 600,
          },
        ],
      }),
    },
  };
}

export default async function Slug({ params }: PageParams) {
  const { slug } = await params;

  let data;
  try {
    const articleResponse = await getArticle(slug);
    data = articleResponse?.data?.data;
    if (!data) notFound();
  } catch (err) {
    notFound();
  }

  switch (data.page_type) {
    case 'category':
      return (
        <Category
          categoryData={data.content}
          breadcrumb={data.breadcrumbs}
        />
      );
    case 'package':
      return (
        <Package
          packageData={data.content}
          breadcrumb={data.breadcrumbs}
        />
      );
    case 'article':
      return (
        <Article
          articleData={data.content}
          breadcrumb={data.breadcrumbs}
        />
      );
    default:
      notFound();
  }
}
