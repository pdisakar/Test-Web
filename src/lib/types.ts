// Shared TypeScript interfaces for the application
// Consolidated from duplicated definitions across components

export interface MenuItem {
  id: string | number;
  item_title: string;
  item_slug?: string;
  url_segment?: string;
  children?: MenuItem[];
}

export interface GlobalDataContent {
  notification?: string;
  main_menu?: {
    menu: MenuItem[];
  };
  footer_menu?: {
    menu?: FooterMenuSection[];
  };
  mobile?: string;
  phone?: string;
  email?: string;
  address?: string;
  company_name?: string;
}

export interface OptionalDataContent {
  [key: string]: any;
}

export interface GlobalData {
  data: GlobalDataContent;
}

export interface OptionalData {
  package?: Package[];
  [key: string]: any;
}

export interface Package {
  id: string | number;
  title: string;
  slug: string;
}

export interface FeaturedPackage {
  package_title: string;
  package_duration: number;
  total_testimonials: number;
  group_default_price: number;
  urlinfo: { url_slug: string };
  featured: { full_path: string };
  [key: string]: any;
}

export interface Testimonial {
  id?: string | number;
  name?: string;
  full_name?: string;
  testimonial?: string;
  review?: string;
  review_date?: string | Date;
  rating?: number;
  avatar?: string;
  urlinfo?: {
    url_title?: string;
  };
  [key: string]: any;
}

export interface BlogAuthor {
  name?: string;
  avatar?: string;
  [key: string]: any;
}

export interface Blog {
  id: string | number;
  title: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  published_at?: string;
  blog_date?: string | Date;
  author?: BlogAuthor;
  authors?: BlogAuthor[];
  featured_image?: string;
  urlinfo?: { url_slug: string };
  featured?: { full_path: string };
  [key: string]: any;
}

export interface BreadcrumbItem {
  title: string;
  url?: string;
  slug?: string;
  [key: string]: any;
}

export interface ItineraryItem {
  id?: string | number;
  itinerary_title?: string | null;
  itinerary_description?: string | null;
  duration?: string | null;
  meals?: string | null;
  accommodation?: string | null;
  origin_elevation?: string | null;
  destination_elevation?: string | null;
}

export interface AboutUsData {
  page_title?: string;
  page_description?: string;
}

export interface BannerData {
  title?: string;
  subtitle?: string;
  image?: string;
  full_path: string;
  [key: string]: any;
}

export interface CategoryData {
  banner?: BannerData;
  title?: string;
  description?: string;
  [key: string]: any;
}

export interface ArticleData {
  page_title: string;
  page_description?: string;
  content?: string;
  [key: string]: any;
}

export interface TripGalleryItem {
  id?: string | number;
  title?: string;
  image?: string;
  [key: string]: any;
}

export interface GroupFaq {
  id?: string | number;
  question?: string;
  answer?: string;
  [key: string]: any;
}

export interface FaqSection {
  sectionTitle?: string;
  faqs?: GroupFaq[];
  [key: string]: any;
}

export interface Departure {
  id?: string | number;
  date?: string;
  price?: number;
  [key: string]: any;
}

export interface UrlInfo {
  url_slug: string;
  [key: string]: any;
}

export interface FeaturedImage {
  full_path: string;
  [key: string]: any;
}

export interface CategoryCardData {
  id?: string | number;
  title?: string;
  description?: string;
  urlinfo?: UrlInfo;
  featured_image?: FeaturedImage;
  [key: string]: any;
}

export interface BestSellingCategory {
  id?: string | number;
  title?: string;
  packages?: FeaturedPackage[];
  [key: string]: any;
}

export interface BlogItemType {
  id: string | number;
  title: string;
  slug: string;
  excerpt?: string;
  published_at?: string;
  author?: BlogAuthor;
  [key: string]: any;
}

export interface TeamMemberMeta {
  meta_title: string;
  meta_description?: string;
  [key: string]: any;
}

export interface TeamMemberUrlInfo {
  url_slug: string;
  [key: string]: any;
}

export interface TeamMemberAvatar {
  full_path: string;
  [key: string]: any;
}

export interface TeamMemberContent {
  full_name: string;
  designation?: string;
  bio?: string;
  [key: string]: any;
}

export interface TeamMemberResponse {
  data: {
    meta?: TeamMemberMeta;
    urlinfo?: TeamMemberUrlInfo;
    avatar?: TeamMemberAvatar;
    content?: TeamMemberContent;
  };
}

export interface PageContent {
  page_title: string;
  page_description?: string;
  [key: string]: any;
}

export interface MembersData {
  pagecontent?: PageContent;
  members?: TeamMemberResponse[];
  [key: string]: any;
}

export interface BlogContent {
  title: string;
  content?: string;
  excerpt?: string;
  [key: string]: any;
}

export interface ParamsPromise {
  params: Promise<{ slug: string }>;
}

export interface PageParams {
  params: Promise<{ slug: string }>;
}

export interface SlugParams {
  params: Promise<{ slug: string }>;
}
export interface HeaderProps {
  globalData: GlobalData;
  optionalData: OptionalData;
}
export interface DesktopNavbarProps {
  globalData: GlobalData;
  optionalData: OptionalData;
}
export interface MobileNavbarProps {
  globalData: GlobalData;
  optionalData: OptionalData;
}
export interface SidePanelProps {
  globalData: GlobalData;
}
export interface SmartSearchProps {
  optionalData: OptionalData;
  onClose?: () => void;
}
export interface HomeSearchProps {
  optionalData: OptionalData;
}
export interface PackageCardProps {
  pkg: FeaturedPackage;
}
export interface FeaturedPackagesProps {
  limit: number;
  data: FeaturedPackage[];
}
export interface TestimonialsCardProps {
  testimonial: Testimonial;
}
export interface FeaturedTestimonialsProps {
  limit: number;
  data: Testimonial[];
}
export interface BlogCardProps {
  blog: Blog;
}
export interface FeaturedBlogProps {
  limit: number;
  data?: Blog[];
}
export interface BreadCrumbProps {
  breadcrumb: BreadcrumbItem[][];
}
export interface BreadCrumbPackageProps {
  breadcrumb: { [key: string]: BreadcrumbItem[] };
  currentpage: string;
}
export interface CategoryProps {
  categoryData: CategoryData;
  breadcrumb: breadcrumbData;
}
export interface breadcrumbData extends Array<Array<BreadcrumbItem>> {}
export interface ArticleProps {
  articleData: ArticleData;
  breadcrumb: breadcrumbData;
}
export interface FooterMenuChild {
  id: string | number;
  item_title: string;
  url_segment: string;
  [key: string]: any;
}

export interface FooterMenuSection {
  id: string | number;
  item_title: string;
  children?: FooterMenuChild[];
  [key: string]: any;
}

export interface FooterProps {
  globalData?: GlobalData;
}