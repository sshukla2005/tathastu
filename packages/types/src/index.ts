// ─── Strapi API Response Wrappers ─────────────────────────────────────────────

export interface StrapiResponse<T> {
  data: T;
  meta: StrapiMeta;
}

export interface StrapiListResponse<T> {
  data: T[];
  meta: StrapiMeta;
}

export interface StrapiMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  url: string;
  formats?: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  };
}

export interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
}

// ─── Site Settings ────────────────────────────────────────────────────────────

export interface SiteSettings {
  logo: StrapiMedia | null;
  headerCtaLabel: string;
  headerCtaHref: string;
  phone: string;
  email: string;
  address?: string;
  copyrightText: string;
  nav: NavItem[];
  footerColumns: FooterColumn[];
  socialLinks: SocialLink[];
}

export interface NavItem {
  id: number;
  label: string;
  href: string;
  children?: NavItem[];
}

export interface FooterColumn {
  id: number;
  title: string;
  links: FooterLink[];
}

export interface FooterLink {
  id: number;
  label: string;
  href: string;
}

export interface SocialLink {
  id: number;
  platform: "facebook" | "twitter" | "linkedin" | "instagram" | "youtube";
  url: string;
}

// ─── Blog Post ────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  body: unknown; // Strapi blocks rich text
  coverImage: StrapiMedia | null;
  publishedDate: string;
  publishedAt: string;
  category?: string;
}

// ─── Industry ─────────────────────────────────────────────────────────────────

export interface Industry {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  shortDescription: string;
  icon: StrapiMedia | null;
  heroImage: StrapiMedia | null;
  order: number;
}

// ─── Testimonial ──────────────────────────────────────────────────────────────

export interface Testimonial {
  id: number;
  documentId: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  company: string;
  avatar: StrapiMedia | null;
  order: number;
}

// ─── Client Logo ──────────────────────────────────────────────────────────────

export interface ClientLogo {
  id: number;
  documentId: string;
  name: string;
  logo: StrapiMedia | null;
  url: string;
  order: number;
}

// ─── Stat ─────────────────────────────────────────────────────────────────────

export interface Stat {
  id: number;
  documentId: string;
  value: string;
  label: string;
  order: number;
}

// ─── Portfolio Item ───────────────────────────────────────────────────────────

export interface PortfolioItem {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  category: "Hardware" | "Software" | "Plugin";
  image: StrapiMedia | null;
  summary: string;
}

// ─── Career ───────────────────────────────────────────────────────────────────

export interface Career {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  department: string;
  isOpen: boolean;
}

// ─── Lead (form submission) ───────────────────────────────────────────────────

export interface LeadInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  source: "Contact" | "Demo" | "Consultation";
}

// ─── Homepage Dynamic Zone ────────────────────────────────────────────────────

export type HomepageSection =
  | HeroSection
  | FeatureCardsSection
  | StatsBandSection
  | ProductPortfolioSection
  | CtaBandSection
  | BlogTeaserSection
  | TestimonialsSection
  | ClientLogosSection;

export interface HeroSection {
  __component: "sections.hero";
  id: number;
  heading: string;
  subtext: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  image: StrapiMedia | null;
}

export interface FeatureCardsSection {
  __component: "sections.feature-cards";
  id: number;
  title: string;
  subtitle: string;
  cards: FeatureCard[];
}

export interface FeatureCard {
  id: number;
  icon: StrapiMedia | null;
  title: string;
  description: string;
}

export interface StatsBandSection {
  __component: "sections.stats-band";
  id: number;
  heading: string;
  stats: Stat[];
}

export interface ProductPortfolioSection {
  __component: "sections.product-portfolio";
  id: number;
  heading: string;
  subtitle: string;
  headline: string;
  ctaLabel: string;
  ctaHref: string;
  items: PortfolioItem[];
}

export interface CtaBandSection {
  __component: "sections.cta-band";
  id: number;
  heading: string;
  subtext: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface BlogTeaserSection {
  __component: "sections.blog-teaser";
  id: number;
  heading: string;
  ctaLabel: string;
  ctaHref: string;
  count: number;
}

export interface TestimonialsSection {
  __component: "sections.testimonials";
  id: number;
  heading: string;
  subtitle: string;
  testimonials: Testimonial[];
}

export interface ClientLogosSection {
  __component: "sections.client-logos";
  id: number;
  logos: ClientLogo[];
}
