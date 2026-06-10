import type { EventItem } from "../types";

interface EventCardProps {
  event: EventItem;
  theme?: "dark" | "light";
}

export default function EventCard({ event, theme = "light" }: EventCardProps) {
  return (
    <div className="flex flex-col cursor-pointer gap-[1rem] h-full w-full">
      <div className={`itemPicture ${theme === "dark" ? "text-white" : ""}`}>
        <img
          className="w-[300px] h-[166px] rounded-[12px]"
          src={event.imageUrl}
          alt={event.title}
        />
      </div>
      <div className="flex flex-col gap-[8px]">
        <div className="itemTitle max-h-[42px] font-bold">{event.title}</div>
        {event.lowestPrice && (
          <div className="itemLowestPrice font-semibold text-[rgb(45,194,117)]">
            {event.lowestPrice}
          </div>
        )}
        <div className="itemDate flex justify-start items-center gap-[10px]">
          <div className="itemDateIcon w-[16px] h-[17px] font-normal text-sm">
            🗓️
          </div>
          <div className="itemDateText">{event.date}</div>
        </div>
      </div>
    </div>
  );
}
