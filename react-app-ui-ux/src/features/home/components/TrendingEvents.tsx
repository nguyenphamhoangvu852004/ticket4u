
import { trendingEvents } from "../data/homeData";
import SectionHeader from "../../../ui/SectionHeader";
import TrendingCard from "../../../ui/TrendingCard";

export default function TrendingEvents() {
  return (
    <div className="w-[1248px] mx-auto mt-[56px] mb-[56px]">
      <SectionHeader title="Trending events" emoji="🔥" showViewMore={false} />

      <div className="flex gap-[16px]">
        {trendingEvents.map((event, idx) => (
          <TrendingCard key={idx} rank={idx + 1} event={event} />
        ))}
      </div>
    </div>
  );
}
