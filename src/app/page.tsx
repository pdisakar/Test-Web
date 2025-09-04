import { getHomeData, getOptionsData } from '@/services/network_requests';
import HomeBanner from '@/components/Banners/HomeBanner';
import FeaturedCategory from '@/components/FeaturedCategory/FeaturedCategory';
import FeaturedPackages from '@/components/FeaturedPackages/FeaturedPackages';
import AboutUs from '@/components/AboutUs/AboutUs';
import BestSellingPackages from '@/components/BestSellingPackages/BestSellingPackages';
import FeaturedTestimonials from '@/components/FeaturedTestimonials/FeaturedTestimonials';
import FeaturedBlog from '@/components/FeaturedBlog/FeaturedBlog';

const BASE_URL = process.env.BASE_URL || '';
const IMAGE_URL = process.env.IMAGE_URL || '';

export async function generateMetadata() {
  const response = await getHomeData();
  const data = response?.data?.data;

  return {
    title: data?.pagecontent?.meta?.meta_title,
    description: data?.pagecontent?.meta?.meta_description,
    alternates: {
      canonical: process.env.CANONICAL_BASE,
    },
    openGraph: {
      title: data?.pagecontent?.meta?.meta_title,
      description: data?.pagecontent?.meta?.meta_description,
      url: BASE_URL,
      images: [
        {
          url: IMAGE_URL + data?.pagecontent?.carousel?.content?.[0]?.full_path,
          width: 1920,
          height: 700,
        },
      ],
    },
  };
}

export default async function Home() {
  const response = await getHomeData();
  const data = response?.data?.data;

  const optionsDataResponse = await getOptionsData();
  const optionsData = optionsDataResponse?.data?.data;

  return (
    <main>
      <HomeBanner optionalData={optionsData} />
      <FeaturedCategory
        data={data?.featured_categories}
        limit={4}
      />

      <BestSellingPackages
        data={data?.category_section_a}
        limit={3}
      />
      <AboutUs data={data?.pagecontent} />
      <FeaturedPackages
        data={data?.featured_packages}
        limit={3}
      />
      <FeaturedTestimonials
        limit={3}
        data={data?.featured_testimonials}
      />
      <FeaturedBlog
        limit={3}
        data={data?.featured_blogs}
      />
    </main>
  );
}
