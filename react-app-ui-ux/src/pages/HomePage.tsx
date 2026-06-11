import CategoryBar from "../features/home/components/CategoryBar";
import HeroBanners from "../features/home/components/HeroBanners";
import FeaturedStars from "../features/home/components/FeaturedStars";
import SpecialEvents from "../features/home/components/SpecialEvents";
import TrendingEvents from "../features/home/components/TrendingEvents";
import TimeFilteredEvents from "../features/home/components/TimeFilteredEvents";
import ResaleTickets from "../features/home/components/ResaleTickets";
import EventCategorySection from "../features/home/components/EventCategorySection";
import ExcitingDestinations from "../features/home/components/ExcitingDestinations";
import {
  attractionEvents,
  genericEvents,
  musicEvents,
  seminarEvents,
  sportsEvents,
  theaterEvents,
} from "../features/home/data/homeData";
import greensm from "../assets/greensm.webp";
import be from "../assets/be.webp";
import shopee from "../assets/shopee.webp";

export default function HomePage() {
  return (
    <>
      <CategoryBar />
      <HeroBanners />
      <FeaturedStars />
      <SpecialEvents />
      <TrendingEvents />
      <TimeFilteredEvents />
      <ResaleTickets />
      <EventCategorySection
        title="Music"
        events={musicEvents}
        promoBanner={{ src: greensm, alt: "Green SM" }}
      />
      <EventCategorySection
        title="Theaters & Art"
        events={theaterEvents}
        promoBanner={{ src: be, alt: "Be" }}
      />
      <EventCategorySection
        title="Seminars & Workshops"
        events={seminarEvents}
        promoBanner={{ src: shopee, alt: "Shopee" }}
      />
      <EventCategorySection
        title="Attractions & Experiences"
        events={attractionEvents}
      />
      <EventCategorySection title="Sports & Others" events={sportsEvents} />
      <ExcitingDestinations />
    </>
  );
}
