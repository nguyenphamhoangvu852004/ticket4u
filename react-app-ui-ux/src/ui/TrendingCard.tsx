
import type { EventItem } from "../types";

interface TrendingCardProps {
  rank: number;
  event: EventItem;
}

export default function TrendingCard({ rank, event }: TrendingCardProps) {
  return (
    <div className="w-[346px] h-[164px] shrink-0 rounded-[18px] flex items-end">
      <p className="text-[76px] shrink-0 leading-[0.8]">{rank}</p>
      <div className="flex-1 h-full rounded-[18px] overflow-hidden ml-2">
        <a href="#" className="block w-full h-full">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </a>
      </div>
    </div>
  );
}
