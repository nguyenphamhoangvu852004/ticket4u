export interface EventItem {
  id: string;
  title: string;
  imageUrl: string;
  lowestPrice?: string;
  date: string;
}

export interface FeaturedStar {
  id: string;
  name: string;
  imageUrl: string;
  verified: boolean;
}

export interface Destination {
  id: string;
  name: string;
  imageUrl: string;
}

export interface CategoryLink {
  label: string;
  href: string;
}
