import type { EventItem } from "../types";

interface EventCardProps {
  event: EventItem;
  theme?: "dark" | "light";
  height?: string;
  width?: string;
}

export default function EventCard({
  event,
  theme = "light",
  height = "h-full",
  width = "w-full",
}: EventCardProps) {
  return (
    <div className="flex flex-col cursor-pointer gap-[1rem] h-full  w-[300px]">
      <div
        className={`itemPicture ${theme === "dark" ? "text-white" : ""} w-full h-full`}
      >
        <img
          className={`rounded-[12px] object-cover  ${height} ${width}`}
          src={event.imageUrl}
          alt={event.name}
        />
      </div>
      <div className="flex flex-col gap-[8px]">
        <div className="itemTitle max-h-[42px] font-bold line-clamp-2">
          {event.name}
        </div>
        {event.price && (
          <div className="itemLowestPrice font-semibold text-[rgb(45,194,117)]">
            {event.price}
          </div>
        )}
        <div className="itemDate flex justify-start items-center gap-[10px]">
          <div className="itemDateIcon w-[16px] h-[17px] font-normal text-sm">
            🗓️
          </div>
          <div className="itemDateText">{event.day}</div>
        </div>
      </div>
    </div>
  );
}
