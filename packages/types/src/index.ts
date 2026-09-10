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
  brands: Brand[];
}

// ─── Brand (partner/product showcased within an Industry) ─────────────────────

export interface Brand {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  category: "Software" | "Hardware";
  shortDescription: string;
  logo: StrapiMedia | null;
  order: number;
  heroImage: StrapiMedia | null;
  aboutDescription: string;
  apps: IconCard[];
  showcases: AppShowcase[];
  clientLogos: ClientLogo[];
}

export interface AppShowcase {
  id: number;
  icon: StrapiMedia | null;
  title: string;
  subtitle: string;
  featuresHeading: string;
  featuresImage: StrapiMedia | null;
  featuresText: string;
  enquiryHeading: string;
  enquiryImage: StrapiMedia | null;
  enquiryText: string;
  direction: "left" | "right";
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

// ─── Team Member ──────────────────────────────────────────────────────────────

export interface TeamMember {
  id: number;
  documentId: string;
  name: string;
  role: string;
  photo: StrapiMedia | null;
  bio: string;
  bgColor?: string;
  order: number;
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
  heading: any;
  subtext: string;
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

// ─── Studio Page Dynamic Zone ─────────────────────────────────────────────────

export type StudioPageSection =
  | StudioHeroSection
  | StudioConnectSection
  | StudioTrustedSection
  | StudioWhoWeAreSection
  | StudioWhatWeDoSection
  | StudioMeetTeamSection
  | StudioPurposeSection
  | StudioFindInsideSection
  | StudioFooterSection;

export interface ListItem {
  id: number;
  text: string;
}

export interface IconCard {
  id: number;
  label: string;
  icon: StrapiMedia | null;
}

export interface ContactCard {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface StudioHeroSection {
  __component: "sections.studio-hero";
  id: number;
  wordmarkLine1: string;
  wordmarkLine2: string;
  heading: string;
  subtext: string;
  ctaLabel: string;
  ctaHref: string;
  backgroundImage: StrapiMedia | null;
  heroImage: StrapiMedia | null;
}

export interface StudioConnectSection {
  __component: "sections.studio-connect";
  id: number;
  heading: string;
  description: string;
  image: StrapiMedia | null;
}

export interface StudioTrustedSection {
  __component: "sections.studio-trusted";
  id: number;
  heading: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  backgroundImage: StrapiMedia | null;
}

export interface StudioWhoWeAreSection {
  __component: "sections.studio-who-we-are";
  id: number;
  heading: string;
  description: string;
  points: ListItem[];
  imageBack: StrapiMedia | null;
  imageFront: StrapiMedia | null;
  badgeImage: StrapiMedia | null;
}

export interface StudioWhatWeDoSection {
  __component: "sections.studio-what-we-do";
  id: number;
  heading: string;
  subtitle: string;
  cards: IconCard[];
  ctaLabel: string;
  ctaHref: string;
}

export interface StudioMeetTeamSection {
  __component: "sections.studio-meet-team";
  id: number;
  heading: string;
  headingHighlight: string;
  subtitle: string;
  members: TeamMember[];
}

export interface StudioPurposeSection {
  __component: "sections.studio-purpose";
  id: number;
  headingPrefix: string;
  headingHighlight: string;
  subtitle: string;
  points: ListItem[];
}

export interface StudioFindInsideSection {
  __component: "sections.studio-find-inside";
  id: number;
  heading: string;
  headingHighlight: string;
  studioToggleLabel: string;
  freelancerToggleLabel: string;
  backgroundImage: StrapiMedia | null;
  studioContacts: ContactCard[];
  freelancerContacts: ContactCard[];
}

export interface StudioFooterSection {
  __component: "sections.studio-footer";
  id: number;
  taglineLine1: string;
  taglineLine2Plain: string;
  taglineHighlight: string;
  ctaText: string;
  subtextBefore: string;
  subtextHighlight1: string;
  subtextMiddle: string;
  subtextHighlight2: string;
}

// ─── Academy Page Dynamic Zone ────────────────────────────────────────────────

export type AcademyPageSection =
  | AcademyHeroSection
  | AcademyAboutSection
  | AcademyProgramsSection
  | AcademyWhyUsSection
  | AcademyCoursesSection
  | AcademySpecializationSection
  | AcademyMeetTeamSection
  | CtaBandSection;

export interface ProgramCard {
  id: number;
  title: string;
  image: StrapiMedia | null;
  description: string;
  items: ListItem[];
  ctaLabel: string;
  ctaHref: string;
}

// ─── Course (Academy course/video catalog) ─────────────────────────────────────

export interface Course {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  image: StrapiMedia | null;
  description: string;
  duration: string;
  badge: string | null;
  isVideo: boolean;
  category: string;
  level: "Beginner" | "Intermediate";
  order: number;
  /** At most one entry — which component is present IS the course's type:
   * course-details.houdini routes to the dedicated Houdini landing page,
   * course-details.standard (or none) uses the generic course detail
   * template. Picking one in the Strapi admin is how an editor chooses the
   * course's type. */
  details: CourseDetailsSection[];
}

export type CourseDetailsSection = CourseDetailsStandardSection | CourseDetailsHoudiniSection;

export interface CourseDetailsStandardSection {
  __component: "course-details.standard";
  id: number;
  trailerHeading: string;
  trailerImage: StrapiMedia | null;
  trailerParagraph1: string;
  trailerParagraph2: string;
  trailerCtaLabel: string;
  breakdownHeading: string;
  breakdownHighlight: string;
  breakdownIntro1: string;
  breakdownIntro2: string;
  breakdownIntro3: string;
  modules: FeatureCard[];
}

export interface IconTextItem {
  id: number;
  icon: StrapiMedia | null;
  emoji: string | null;
  title: string;
  text: string;
  accentColor: string | null;
}

export interface CourseDetailsHoudiniSection {
  __component: "course-details.houdini";
  id: number;
  introHeading: string;
  introHighlight: string;
  introParagraph1: string;
  introParagraph2: string;
  introImage: StrapiMedia | null;
  highlightsHeading: string;
  highlightsHighlight: string;
  highlightsImage: StrapiMedia | null;
  highlightPoints: IconTextItem[];
  highlightFeatures: IconTextItem[];
  whatYouGetHeading: string;
  whatYouGetSubtitle: string;
  whatYouGetItems: IconTextItem[];
  whoForHeading: string;
  whoForSubtitle: string;
  whoForItems: IconTextItem[];
  visitHeading: string;
  visitSubheading: string;
  visitPhone: string;
  visitEmail: string;
  brochureFile: StrapiMedia | null;
  faqsHeading: string;
  faqsHighlight: string;
  faqs: FaqItem[];
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

/** Where a course card should link — the dedicated Houdini landing page for
 * that one course, or the generic per-course detail template otherwise. */
export function getCourseHref(course: Pick<Course, "slug" | "details">): string {
  const isHoudini = course.details?.some((d) => d.__component === "course-details.houdini");
  return isHoudini ? "/academy/courses&videos/houdini-course" : `/academy/courses&videos/${course.slug}`;
}

export interface AcademyHeroSection {
  __component: "sections.academy-hero";
  id: number;
  wordmarkLine1: string;
  wordmarkLine2: string;
  tagline: string;
  heading: string;
  subtext: string;
  ctaLabel: string;
  ctaHref: string;
  backgroundImage: StrapiMedia | null;
  heroImage: StrapiMedia | null;
}

export interface AcademyAboutSection {
  __component: "sections.academy-about";
  id: number;
  headingLine1: string;
  headingHighlight: string;
  description: string;
  image: StrapiMedia | null;
  features: FeatureCard[];
  ctaLabel: string;
  ctaHref: string;
}

export interface AcademyProgramsSection {
  __component: "sections.academy-programs";
  id: number;
  heading: string;
  headingHighlight: string;
  subtitle: string;
  programs: ProgramCard[];
}

export interface AcademyWhyUsSection {
  __component: "sections.academy-why-us";
  id: number;
  heading: string;
  headingHighlight: string;
  subtitle: string;
  cards: FeatureCard[];
  ctaLabel: string;
  ctaHref: string;
}

export interface AcademyCoursesSection {
  __component: "sections.academy-courses";
  id: number;
  heading: string;
  headingHighlight: string;
  subtitle: string;
  courses: Course[];
  ctaLabel: string;
  ctaHref: string;
}

export interface AcademySpecializationSection {
  __component: "sections.academy-specialization";
  id: number;
  headingLine1: string;
  headingLine2Plain: string;
  headingHighlight: string;
  backgroundImage: StrapiMedia | null;
  specializations: IconCard[];
}

export interface AcademyMeetTeamSection {
  __component: "sections.academy-meet-team";
  id: number;
  heading: string;
  headingHighlight: string;
  subtitle: string;
  members: TeamMember[];
}

// ─── Industries Page Dynamic Zone ─────────────────────────────────────────────

export type IndustriesPageSection =
  | IndustriesHeroSection
  | IndustriesGridSection
  | StatsBandSection
  | FeatureCardsSection
  | CtaBandSection
  | TestimonialsSection
  | ClientLogosSection;

export interface IndustryCard {
  id: number;
  title: string;
  image: StrapiMedia | null;
  href: string;
  isFeatured: boolean;
}

export interface IndustriesHeroSection {
  __component: "sections.industries-hero";
  id: number;
  heading: string;
  breadcrumbLabel: string;
  backgroundImage: StrapiMedia | null;
}

export interface IndustriesGridSection {
  __component: "sections.industries-grid";
  id: number;
  heading: string;
  headingHighlight: string;
  subtitle: string;
  cards: IndustryCard[];
}

// ─── Event ──────────────────────────────────────────────────────────────────

export interface Event {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  summary: string;
  coverImage: StrapiMedia | null;
  eventDate: string | null;
  order: number;
  galleryHeading: string;
  galleryText: string;
  galleryTall1: StrapiMedia | null;
  gallerySmall1: StrapiMedia | null;
  gallerySmall2: StrapiMedia | null;
  galleryWide: StrapiMedia | null;
  galleryCenter: StrapiMedia | null;
  galleryTall2: StrapiMedia | null;
  galleryBottomA: StrapiMedia | null;
  galleryBottomB: StrapiMedia | null;
}

// ─── Event Page Dynamic Zone ──────────────────────────────────────────────────

export type EventPageSection = EventHeroSection | EventUpcomingSection | EventPastSection | CtaBandSection;

export interface EventBlock {
  id: number;
  heading: string;
  text: string;
  image: StrapiMedia | null;
  isVideo: boolean;
}

export interface EventHeroSection {
  __component: "sections.event-hero";
  id: number;
  heading: string;
  backgroundImage: StrapiMedia | null;
}

export interface EventUpcomingSection {
  __component: "sections.event-upcoming";
  id: number;
  heading: string;
  headingHighlight: string;
  blocks: EventBlock[];
}

export interface EventPastSection {
  __component: "sections.event-past";
  id: number;
  heading: string;
  headingHighlight: string;
  events: Event[];
}
