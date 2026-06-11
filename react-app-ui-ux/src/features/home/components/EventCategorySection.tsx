import type { EventItem } from "../../../types";
import SectionHeader from "../../../ui/SectionHeader";
import EventCard from "../../../ui/EventCard";
import PromoBanner from "../../../ui/PromoBanner";

interface EventCategorySectionProps {
  title: string;
  events: EventItem[];
  promoBanner?: { src: string; alt?: string };
}

export default function EventCategorySection({
  title,
  events,
  promoBanner,
}: EventCategorySectionProps) {
  return (
    <div className="mx-auto mb-[56px] w-[1248px]">
      {promoBanner && (
        <PromoBanner
          src={promoBanner.src}
          alt={promoBanner.alt}
          className="mt-[56px]"
        />
      )}
      <SectionHeader title={title} />

      <div className="flex justify-start gap-[16px] w-full">
        {events.map((event, idx) => (
          <EventCard key={idx} event={event} />
        ))}
      </div>
    </div>
  );
}
