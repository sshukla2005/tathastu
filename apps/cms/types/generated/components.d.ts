import type { Schema, Struct } from '@strapi/strapi';

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
      'sections.blog-teaser': SectionsBlogTeaser;
      'sections.client-logos': SectionsClientLogos;
      'sections.cta-band': SectionsCtaBand;
      'sections.feature-cards': SectionsFeatureCards;
      'sections.hero': SectionsHero;
      'sections.product-portfolio': SectionsProductPortfolio;
      'sections.stats-band': SectionsStatsBand;
      'sections.testimonials': SectionsTestimonials;
      'shared.feature-card': SharedFeatureCard;
      'shared.footer-column': SharedFooterColumn;
      'shared.footer-link': SharedFooterLink;
      'shared.nav-item': SharedNavItem;
      'shared.social-link': SharedSocialLink;
    }
  }
}
