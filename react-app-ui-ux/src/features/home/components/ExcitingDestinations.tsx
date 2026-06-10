
import { destinations } from "../data/homeData";
import SectionHeader from "../../../ui/SectionHeader";
import DestinationCard from "../../../ui/DestinationCard";

export default function ExcitingDestinations() {
  return (
    <div className="mx-auto min-h-[298px] w-[1248px] mt-[16px] mb-[56px]">
      <SectionHeader title="Exciting destination" showViewMore={false} />

      <div className="flex flex-row justify-start gap-[16px]">
        {destinations.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </div>
  );
}
