import { useState } from "react";
import { genericEvents } from "../data/homeData";
import EventCard from "../../../ui/EventCard";

export default function TimeFilteredEvents() {
  const [activeTab, setActiveTab] = useState<"weekend" | "month">("weekend");

  return (
    <div className="mx-auto mt-[56px] mb-[56px] min-h-[298px] w-[1248px]">
      <div className="flex justify-between mb-[16px]">
        <div className="flex gap-[16px]">
          <div
            className="cursor-pointer"
            onClick={() => setActiveTab("weekend")}
          >
            <p>This weekend</p>
            {activeTab === "weekend" && (
              <div className="w-[100%] h-[4px] bg-[rgb(45,194,117)] rounded-[10px]"></div>
            )}
          </div>

          <div
            className="cursor-pointer"
            onClick={() => setActiveTab("month")}
          >
            <p>This month</p>
            {activeTab === "month" && (
              <div className="w-[100%] h-[4px] bg-[rgb(45,194,117)] rounded-[10px]"></div>
            )}
          </div>
        </div>

        <div>
          <p className="text-gray-400 font-semibold cursor-pointer">{`View more >`}</p>
        </div>
      </div>

      <div className="flex justify-start gap-[16px] w-full h-full">
        {genericEvents.slice(0, 3).map((event, idx) => (
          <EventCard key={idx} event={event} />
        ))}
      </div>
    </div>
  );
}
