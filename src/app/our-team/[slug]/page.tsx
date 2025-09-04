import { getTeamMember, getStaticRoutes } from '@/services/network_requests';
import Image from 'next/image';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import Link from 'next/link';

const IMAGE_URL = process.env.IMAGE_URL || '';
const BASE_URL = process.env.BASE_URL || '';
const CANONICAL_BASE = process.env.CANONICAL_BASE || '';

interface TeamMemberMeta {
  meta_title: string;
  meta_description: string;
}

interface TeamMemberUrlInfo {
  url_slug: string;
}

interface TeamMemberAvatar {
  full_path: string;
  alt_text?: string;
}

interface TeamMemberContent {
  full_name: string;
  position: string;
  description: string;
  meta: TeamMemberMeta;
  urlinfo: TeamMemberUrlInfo;
  avatar?: TeamMemberAvatar;
}

interface TeamMemberResponse {
  data: {
    data: {
      content: TeamMemberContent;
    };
  };
}

interface SlugParams {
  params: Promise<{
    slug: string;
  }>;
}

const getCachedTeamMember = cache(
  async (slug: string): Promise<TeamMemberContent | null> => {
    try {
      const response: TeamMemberResponse = await getTeamMember(slug);
      return response?.data?.data?.content || null;
    } catch (error) {
      console.error('Failed to fetch team member:', error);
      return null;
    }
  }
);

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
}: SlugParams): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCachedTeamMember(slug);

  if (!data) {
    return {
      title: 'Member Not Found',
    };
  }

  return {
    title: data.meta.meta_title,
    description: data.meta.meta_description,
    alternates: {
      canonical: `${CANONICAL_BASE}/our-team/${data.urlinfo.url_slug}`,
    },
    openGraph: {
      title: data.meta.meta_title,
      description: data.meta.meta_description,
      url: `${BASE_URL}/our-team/${data.urlinfo.url_slug}`,
      ...(data.avatar && {
        images: [
          {
            url: `${IMAGE_URL}${data.avatar.full_path}`,
            width: 250,
            height: 250,
          },
        ],
      }),
    },
  };
}

export default async function Slug({ params }: SlugParams) {
  const { slug } = await params;
  const data = await getCachedTeamMember(slug);

  if (!data) {
    return notFound();
  }

  return (
    <div className="user-page">
      <div className="common-box">
        <div className="container grid grid-cols-4 gap-6">
          <div className="user-profile col-span-4 md:col-span-1">
            {data?.avatar && (
              <div className="div p-2 border border-primary/10 shadow-custom-shadow rounded-md">
                <figure className="card-img image-slot before:aspect-[256/256]">
                  <Image
                    src={`${IMAGE_URL}${data?.avatar.full_path}`}
                    alt={data?.full_name || 'User Profile'}
                    title={data?.full_name}
                    width={256}
                    height={256}
                    className="object-cover"
                    sizes="(max-width: 256px) 100vw, (max-width: 256px) 50vw, 256px"
                  />
                </figure>
                <figcaption className="about-member text-center px-3 pt-3 pb-4">
                  <h4 className="text-lg font-bold text-headings capitalize">
                    {data.full_name}
                  </h4>
                  <p className="mt-1 text-sm font-semibold text-muted capitalize">
                    {data.position}
                  </p>
                </figcaption>
              </div>
            )}
          </div>

          <div className="user-description col-span-4 md:col-span-3">
            <article className='mb-6' dangerouslySetInnerHTML={{ __html: data.description }} />

            <Link href="/our-team" className='mt-6 px-5 py-3 bg-primary text-white rounded-md font-bold '>Back To Team</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
