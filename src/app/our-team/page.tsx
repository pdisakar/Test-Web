import React from 'react';
import { getAllMembers } from '@/services/network_requests';
import Image from 'next/image';
import Link from 'next/link';

const IMAGE_URL = process.env.IMAGE_URL || '';
const CANONICAL_BASE = process.env.CANONICAL_BASE || '';

interface UrlInfo {
  url_slug: string;
}

interface Member {
  id: string | number;
  full_name: string;
  position?: string;
  avatar: { full_path: string };
  urlinfo: UrlInfo;
}

interface Section {
  id: string | number;
  title: string;
  members?: Member[];
}

interface PageContent {
  page_title: string;
  page_description?: string;
  meta?: {
    meta_title?: string;
    meta_description?: string;
    banner?: string;
  };
}

interface MembersData {
  pagecontent?: PageContent;
  listcontent?: Section[];
}

export async function generateMetadata(): Promise<any> {
  const response = await getAllMembers();
  const data: MembersData = response.data.data;

  const metaTitle =
    data.pagecontent?.meta?.meta_title || data.pagecontent?.page_title || '';
  const metaDescription =
    data.pagecontent?.meta?.meta_description ||
    data.pagecontent?.page_description ||
    '';

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical: `${CANONICAL_BASE}/our-team` },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `${CANONICAL_BASE}/our-team`,
      ...(data.pagecontent?.meta?.banner && {
        images: [
          {
            url: IMAGE_URL + data.pagecontent.meta.banner,
            width: 1200,
            height: 600,
          },
        ],
      }),
    },
  };
}

const Page = async () => {
  const response = await getAllMembers();
  const data: MembersData = response.data.data;

  return (
    <div className="pb-0 common-box">
      <div className="container">
        {data?.pagecontent?.page_description && (
          <div className="about-section">
            <div className="title text-center">
              <h1
                dangerouslySetInnerHTML={{
                  __html: data.pagecontent.page_title,
                }}
              />
            </div>
            <article
              className="text-center"
              dangerouslySetInnerHTML={{
                __html: data.pagecontent.page_description,
              }}
            />
          </div>
        )}

        {data?.listcontent && (
          <div className="team-member mt-6">
            {data.listcontent.map(
              section =>
                Array.isArray(section.members) &&
                section.members.length > 0 && (
                  <div
                    className="team-category mt-6"
                    key={section.id}>
                    <h3 className="text-center text-headings font-black text-2xl">
                      {section.title}
                    </h3>
                    <ul className="mt-4 flex flex-wrap items-center justify-center gap-6">
                      {section.members.map(member => (
                        <li
                          key={member.id}
                          className="p-2 border border-primary/10 shadow-custom-shadow rounded-md">
                          <Link
                            href={`our-team/${member.urlinfo.url_slug}`}
                            aria-label={`View profile of ${member.full_name}`}>
                            <figure className="image-slot before:aspect-[469/469] min-w-[250px] max-w-[250px]">
                              <Image
                                src={IMAGE_URL + member.avatar.full_path}
                                alt={member.full_name}
                                width={640}
                                height={648}
                                title={member.full_name}
                                className="object-cover rounded-[4px]"
                                priority
                                sizes="(max-width: 469px) 100vw, (max-width: 469px) 50vw, 469px"
                              />
                            </figure>
                            <figcaption className="about-member text-center px-3 pt-3 pb-4">
                              <h4 className="text-lg font-bold text-headings capitalize">
                                {member.full_name}
                              </h4>
                              <p className="mt-1 text-sm font-semibold text-muted capitalize">
                                {member.position}
                              </p>
                            </figcaption>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
