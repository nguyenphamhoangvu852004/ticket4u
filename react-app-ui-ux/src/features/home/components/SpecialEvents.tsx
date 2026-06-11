import { specialEvents } from "../data/homeData";
import SectionHeader from "../../../ui/SectionHeader";
import { useEffect, useState } from "react";

export default function SpecialEvents() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log("currentIndex changed:", currentIndex);
  }, [currentIndex]);

  const maxIndex = 1;

  function handleClick(command: string) {
    if (command === ">") {
      setCurrentIndex(currentIndex + 1);
    } else if (command === "<") {
      setCurrentIndex(currentIndex - 1);
    }
  }
  return (
    <div className="w-[1248px] mx-auto mt-[56px] mb-[56px] relative">
      <SectionHeader title="Special events" showViewMore={false} />

      <div
        className="flex justify-start gap-[16px] w-full"
        style={{
          overflowX: "auto",
          cursor: "grab",
          scrollbarWidth: "none",
        }}
      >
        {specialEvents.map((event, idx) => (
          <div
            key={idx}
            className="w-[260px] h-[350px] shrink-0 rounded-[18px] overflow-hidden"
          >
            <a href="#" className="block w-full h-full">
              <img
                src={event.imageUrl}
                alt={event.name}
                className="w-full h-full object-cover"
              />
            </a>
          </div>
        ))}
        {currentIndex < maxIndex ? (
          <div className="moveToRight w-[60px] h-[60px] absolute top-[50%] right-0 bg-[rgba(0,0,0,0.5)] text-white rounded-l-[8px] text-[24px] font-bold">
            <button
              className="cursor-pointer w-full h-full text-center"
              onClick={() => handleClick(">")}
            >{`>`}</button>
          </div>
        ) : null}
        {currentIndex > 0 ? (
          <div className="moveToLeft w-[60px] h-[60px] absolute top-[50%] left-0 bg-[rgba(0,0,0,0.5)] text-white rounded-r-[8px] text-[24px] font-bold">
            <button
              className="cursor-pointer w-full h-full text-center"
              onClick={() => handleClick("<")}
            >{`<`}</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
