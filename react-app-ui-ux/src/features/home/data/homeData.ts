import type { EventItem, FeaturedStar, Destination } from "../../../types";

export const featuredStars: FeaturedStar[] = Array(7).fill({
  id: "1",
  name: "Name",
  imageUrl: "https://placehold.co/140",
  verified: true
});

export const specialEvents: EventItem[] = Array(4).fill({
  id: "1",
  title: "Special Event",
  imageUrl: "https://placehold.co/304x160",
  date: "06 May, 2026"
});

export const trendingEvents: EventItem[] = Array(4).fill({
  id: "1",
  title: "Trending Event",
  imageUrl: "https://placehold.co/304x160",
  date: "06 May, 2026"
});

export const genericEvents: EventItem[] = Array(4).fill({
  id: "1",
  title: "ART WORKSHOP \"FRENCH LEMON MINI TARTE\"",
  imageUrl: "https://placehold.co/300x166",
  lowestPrice: "From 390.000đ",
  date: "06 May, 2026"
});

export const resaleTickets: EventItem[] = Array(3).fill({
  id: "1",
  title: "[Nhà Hát Bến Thành] Hài kịch: Đảo Hoa Hậu",
  imageUrl: "https://placehold.co/280x158",
  date: "06 May, 2026"
});

export const destinations: Destination[] = [
  { id: "1", name: "Ho Chi Minh City", imageUrl: "https://placehold.co/300x298" },
  { id: "2", name: "Ha Noi", imageUrl: "https://placehold.co/300x298" },
  { id: "3", name: "Dalat city", imageUrl: "https://placehold.co/300x298" },
  { id: "4", name: "Other locations", imageUrl: "https://placehold.co/300x298" }
];
