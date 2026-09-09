import type { Schema, Struct } from '@strapi/strapi';

export interface SectionsAcademyAbout extends Struct.ComponentSchema {
  collectionName: 'components_sections_academy_abouts';
  info: {
    displayName: 'Academy About';
    icon: 'information';
  };
  attributes: {
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    features: Schema.Attribute.Component<'shared.feature-card', true>;
    headingHighlight: Schema.Attribute.String;
    headingLine1: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface SectionsAcademyCourses extends Struct.ComponentSchema {
  collectionName: 'components_sections_academy_courses';
  info: {
    displayName: 'Academy Courses';
    icon: 'play';
  };
  attributes: {
    courses: Schema.Attribute.Component<'shared.course-card', true>;
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    headingHighlight: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
  };
}

export interface SectionsAcademyHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_academy_heroes';
  info: {
    displayName: 'Academy Hero';
    icon: 'layout';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    heroImage: Schema.Attribute.Media<'images'>;
    subtext: Schema.Attribute.Text;
    tagline: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Learn. Rise. Lead.'>;
    wordmarkLine1: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'TATHASTU'>;
    wordmarkLine2: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'ACADEMY'>;
  };
}

export interface SectionsAcademyMeetTeam extends Struct.ComponentSchema {
  collectionName: 'components_sections_academy_meet_teams';
  info: {
    displayName: 'Academy Meet the Team';
    icon: 'user';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    headingHighlight: Schema.Attribute.String;
    members: Schema.Attribute.Relation<
      'oneToMany',
      'api::team-member.team-member'
    >;
    subtitle: Schema.Attribute.Text;
  };
}

export interface SectionsAcademyPrograms extends Struct.ComponentSchema {
  collectionName: 'components_sections_academy_programs';
  info: {
    displayName: 'Academy Programs';
    icon: 'book';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    headingHighlight: Schema.Attribute.String;
    programs: Schema.Attribute.Component<'shared.program-card', true>;
    subtitle: Schema.Attribute.Text;
  };
}

export interface SectionsAcademySpecialization extends Struct.ComponentSchema {
  collectionName: 'components_sections_academy_specializations';
  info: {
    displayName: 'Academy Specialization';
    icon: 'grid';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    headingHighlight: Schema.Attribute.String;
    headingLine1: Schema.Attribute.String & Schema.Attribute.Required;
    headingLine2Plain: Schema.Attribute.String;
    specializations: Schema.Attribute.Component<'shared.icon-card', true>;
  };
}

export interface SectionsAcademyWhyUs extends Struct.ComponentSchema {
  collectionName: 'components_sections_academy_why_uses';
  info: {
    displayName: 'Academy Why Us';
    icon: 'star';
  };
  attributes: {
    cards: Schema.Attribute.Component<'shared.feature-card', true>;
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    headingHighlight: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
  };
}

export interface SectionsBlogTeaser extends Struct.ComponentSchema {
  collectionName: 'components_sections_blog_teasers';
  info: {
    displayName: 'Blog Teaser';
    icon: 'feather';
  };
  attributes: {
    count: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<3>;
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    heading: Schema.Attribute.String;
  };
}

export interface SectionsClientLogos extends Struct.ComponentSchema {
  collectionName: 'components_sections_client_logos';
  info: {
    displayName: 'Client Logos';
    icon: 'star';
  };
  attributes: {
    logos: Schema.Attribute.Relation<
      'oneToMany',
      'api::client-logo.client-logo'
    >;
  };
}

export interface SectionsCtaBand extends Struct.ComponentSchema {
  collectionName: 'components_sections_cta_bands';
  info: {
    displayName: 'CTA Band';
    icon: 'cursor';
  };
  attributes: {
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subtext: Schema.Attribute.Text;
  };
}

export interface SectionsFeatureCards extends Struct.ComponentSchema {
  collectionName: 'components_sections_feature_cards';
  info: {
    displayName: 'Feature Cards';
    icon: 'grid';
  };
  attributes: {
    cards: Schema.Attribute.Component<'shared.feature-card', true>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'Hero';
    icon: 'layout';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    primaryCtaHref: Schema.Attribute.String;
    primaryCtaLabel: Schema.Attribute.String;
    secondaryCtaHref: Schema.Attribute.String;
    secondaryCtaLabel: Schema.Attribute.String;
    subtext: Schema.Attribute.Text;
  };
}

export interface SectionsProductPortfolio extends Struct.ComponentSchema {
  collectionName: 'components_sections_product_portfolios';
  info: {
    displayName: 'Product Portfolio';
    icon: 'briefcase';
  };
  attributes: {
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    headline: Schema.Attribute.String;
    items: Schema.Attribute.Relation<
      'oneToMany',
      'api::portfolio-item.portfolio-item'
    >;
    subtitle: Schema.Attribute.Text;
  };
}

export interface SectionsStatsBand extends Struct.ComponentSchema {
  collectionName: 'components_sections_stats_bands';
  info: {
    displayName: 'Stats Band';
    icon: 'chartCircle';
  };
  attributes: {
    heading: Schema.Attribute.String;
    stats: Schema.Attribute.Relation<'oneToMany', 'api::stat.stat'>;
  };
}

export interface SectionsStudioConnect extends Struct.ComponentSchema {
  collectionName: 'components_sections_studio_connects';
  info: {
    displayName: 'Studio Connect';
    icon: 'connector';
  };
  attributes: {
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface SectionsStudioFindInside extends Struct.ComponentSchema {
  collectionName: 'components_sections_studio_find_insides';
  info: {
    displayName: 'Studio Find Inside';
    icon: 'search';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    freelancerContacts: Schema.Attribute.Component<'shared.contact-card', true>;
    freelancerToggleLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'For Freelancers'>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    headingHighlight: Schema.Attribute.String;
    studioContacts: Schema.Attribute.Component<'shared.contact-card', true>;
    studioToggleLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'For Studios'>;
  };
}

export interface SectionsStudioFooter extends Struct.ComponentSchema {
  collectionName: 'components_sections_studio_footers';
  info: {
    displayName: 'Studio Footer';
    icon: 'layout';
  };
  attributes: {
    ctaText: Schema.Attribute.Text;
    subtextBefore: Schema.Attribute.String;
    subtextHighlight1: Schema.Attribute.String;
    subtextHighlight2: Schema.Attribute.String;
    subtextMiddle: Schema.Attribute.String;
    taglineHighlight: Schema.Attribute.String;
    taglineLine1: Schema.Attribute.String & Schema.Attribute.Required;
    taglineLine2Plain: Schema.Attribute.String;
  };
}

export interface SectionsStudioHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_studio_heroes';
  info: {
    displayName: 'Studio Hero';
    icon: 'layout';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    heroImage: Schema.Attribute.Media<'images'>;
    subtext: Schema.Attribute.String;
    wordmarkLine1: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'TATHASTU'>;
    wordmarkLine2: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'STUDIO'>;
  };
}

export interface SectionsStudioMeetTeam extends Struct.ComponentSchema {
  collectionName: 'components_sections_studio_meet_teams';
  info: {
    displayName: 'Studio Meet the Team';
    icon: 'user';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    headingHighlight: Schema.Attribute.String;
    members: Schema.Attribute.Relation<
      'oneToMany',
      'api::team-member.team-member'
    >;
    subtitle: Schema.Attribute.Text;
  };
}

export interface SectionsStudioPurpose extends Struct.ComponentSchema {
  collectionName: 'components_sections_studio_purposes';
  info: {
    displayName: 'Studio Purpose';
    icon: 'bulletList';
  };
  attributes: {
    headingHighlight: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Purpose'>;
    headingPrefix: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Our'>;
    points: Schema.Attribute.Component<'shared.list-item', true>;
    subtitle: Schema.Attribute.Text;
  };
}

export interface SectionsStudioTrusted extends Struct.ComponentSchema {
  collectionName: 'components_sections_studio_trusteds';
  info: {
    displayName: 'Studio Trusted By';
    icon: 'shield';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text;
  };
}

export interface SectionsStudioWhatWeDo extends Struct.ComponentSchema {
  collectionName: 'components_sections_studio_what_we_dos';
  info: {
    displayName: 'Studio What We Do';
    icon: 'grid';
  };
  attributes: {
    cards: Schema.Attribute.Component<'shared.icon-card', true>;
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text;
  };
}

export interface SectionsStudioWhoWeAre extends Struct.ComponentSchema {
  collectionName: 'components_sections_studio_who_we_ares';
  info: {
    displayName: 'Studio Who We Are';
    icon: 'user';
  };
  attributes: {
    badgeImage: Schema.Attribute.Media<'images'>;
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    imageBack: Schema.Attribute.Media<'images'>;
    imageFront: Schema.Attribute.Media<'images'>;
    points: Schema.Attribute.Component<'shared.list-item', true>;
  };
}

export interface SectionsTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_sections_testimonials';
  info: {
    displayName: 'Testimonials Section';
    icon: 'quote';
  };
  attributes: {
    heading: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
    testimonials: Schema.Attribute.Relation<
      'oneToMany',
      'api::testimonial.testimonial'
    >;
  };
}

export interface SharedContactCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_contact_cards';
  info: {
    displayName: 'Contact Card';
    icon: 'phone';
  };
  attributes: {
    email: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    phone: Schema.Attribute.String;
  };
}

export interface SharedCourseCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_course_cards';
  info: {
    displayName: 'Course Card';
    icon: 'play';
  };
  attributes: {
    badge: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    duration: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    isVideo: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFeatureCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_feature_cards';
  info: {
    displayName: 'Feature Card';
    icon: 'apps';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFooterColumn extends Struct.ComponentSchema {
  collectionName: 'components_shared_footer_columns';
  info: {
    displayName: 'Footer Column';
    icon: 'layer';
  };
  attributes: {
    links: Schema.Attribute.Component<'shared.footer-link', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFooterLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_footer_links';
  info: {
    displayName: 'Footer Link';
    icon: 'link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedIconCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_icon_cards';
  info: {
    displayName: 'Icon Card';
    icon: 'picture';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedListItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_list_items';
  info: {
    displayName: 'List Item';
    icon: 'check';
  };
  attributes: {
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedNavItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_items';
  info: {
    displayName: 'Nav Item';
    icon: 'link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedProgramCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_program_cards';
  info: {
    displayName: 'Program Card';
    icon: 'book';
  };
  attributes: {
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    items: Schema.Attribute.Component<'shared.list-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    displayName: 'Social Link';
    icon: 'earth';
  };
  attributes: {
    platform: Schema.Attribute.Enumeration<
      ['facebook', 'twitter', 'linkedin', 'instagram', 'youtube']
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'sections.academy-about': SectionsAcademyAbout;
      'sections.academy-courses': SectionsAcademyCourses;
      'sections.academy-hero': SectionsAcademyHero;
      'sections.academy-meet-team': SectionsAcademyMeetTeam;
      'sections.academy-programs': SectionsAcademyPrograms;
      'sections.academy-specialization': SectionsAcademySpecialization;
      'sections.academy-why-us': SectionsAcademyWhyUs;
      'sections.blog-teaser': SectionsBlogTeaser;
      'sections.client-logos': SectionsClientLogos;
      'sections.cta-band': SectionsCtaBand;
      'sections.feature-cards': SectionsFeatureCards;
      'sections.hero': SectionsHero;
      'sections.product-portfolio': SectionsProductPortfolio;
      'sections.stats-band': SectionsStatsBand;
      'sections.studio-connect': SectionsStudioConnect;
      'sections.studio-find-inside': SectionsStudioFindInside;
      'sections.studio-footer': SectionsStudioFooter;
      'sections.studio-hero': SectionsStudioHero;
      'sections.studio-meet-team': SectionsStudioMeetTeam;
      'sections.studio-purpose': SectionsStudioPurpose;
      'sections.studio-trusted': SectionsStudioTrusted;
      'sections.studio-what-we-do': SectionsStudioWhatWeDo;
      'sections.studio-who-we-are': SectionsStudioWhoWeAre;
      'sections.testimonials': SectionsTestimonials;
      'shared.contact-card': SharedContactCard;
      'shared.course-card': SharedCourseCard;
      'shared.feature-card': SharedFeatureCard;
      'shared.footer-column': SharedFooterColumn;
      'shared.footer-link': SharedFooterLink;
      'shared.icon-card': SharedIconCard;
      'shared.list-item': SharedListItem;
      'shared.nav-item': SharedNavItem;
      'shared.program-card': SharedProgramCard;
      'shared.social-link': SharedSocialLink;
    }
  }
}
