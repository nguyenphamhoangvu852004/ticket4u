export interface EventItem {
  id: number;
  originalId: number;
  imageUrl: string;
  deeplink: string;
  title?: string;
  name?: string;
  price?: number;
  day?: string;
  isNewBookingFlow: boolean;
  isFree?: boolean;
  orgLogoUrl?: string;
  badge?: string | null;
  url?: string;
  categories?: string | null;
  createdAt?: string;
}

export interface FeaturedStar {
  name: string;
  slug: string;
  deeplink: string;
  avatarUrl: string;
  isVerified: boolean;
}

export interface Destination {
  id: number;
  code: number;
  name: {
    en: string;
    vi: string;
  };
  deeplink: string;
  image: string;
}

export interface CategoryLink {
  label: string;
  href: string;
}
