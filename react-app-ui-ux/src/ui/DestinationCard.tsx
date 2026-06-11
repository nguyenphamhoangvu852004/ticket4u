import type { Destination } from "../types";

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <div className="relative w-[298px] h-[300px] rounded-[12px] overflow-hidden cursor-pointer">
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src={destination.image}
        alt={destination.name.en}
      />
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-[rgba(45,194,117,0.85)]
          via-[rgba(45,194,117,0.25)]
          to-transparent
        "
      />
      <div
        className="
          absolute
          bottom-[24px]
          left-[16px]
          z-10
          text-white
          font-bold
          text-[24px]
        "
      >
        {destination.name.en}
      </div>
    </div>
  );
}
