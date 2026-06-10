
import { specialEvents } from "../data/homeData";
import SectionHeader from "../../../ui/SectionHeader";

export default function SpecialEvents() {
  return (
    <div className="w-[1248px] mx-auto mt-[56px] mb-[56px]">
      <SectionHeader title="Special events" showViewMore={false} />

      <div className="flex gap-[16px]">
        {specialEvents.map((event, idx) => (
          <div key={idx} className="w-[260px] h-[350px] shrink-0 rounded-[18px] overflow-hidden">
            <a href="#" className="block w-full h-full">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
