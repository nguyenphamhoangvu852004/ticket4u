import { featuredStars } from "../data/homeData";
import SectionHeader from "../../../ui/SectionHeader";
import tick from "../../../assets/tick.png";
import { useEffect, useState } from "react";

export default function FeaturedStars() {
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
    <div
      className="w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://salt.tkbcdn.com/ts/ds/9d/b8/1e/8ce13481fedd70d375afce988956d9cc.jpg')",
      }}
    >
      <div className="w-[1248px] mr-auto ml-auto pt-[56px] pb-[56px] text-white relative">
        <SectionHeader title="Featured Stars" emoji="⭐" />

        <div
          className="flex justify-start gap-[16px]"
          style={{
            overflowX: "auto",
            cursor: "grab",
            scrollbarWidth: "none",
          }}
        >
          {featuredStars.map((star, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center border border-white rounded-[18px] pb-[5px] backdrop-blur-xs bg-green-400/10  p-[6px]"
              style={{ flexShrink: 0 }} /* Prevent cards from shrinking */
            >
              <div className="w-[152px] h-[152px] p-[6px]">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <a href="#" className="block w-full h-full">
                    <img
                      src={star.avatarUrl}
                      alt={star.slug}
                      className="w-full h-full object-cover"
                      draggable={false} /* Prevent browser default image drag */
                    />
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-center gap-[6px] text-[14px] w-[152px] p-[6px]">
                <p className="line-clamp-1 font-bold">{star.name}</p>
                {star.isVerified && (
                  <img
                    src={tick}
                    alt="verified"
                    className="w-[16px] h-[16px]"
                    draggable={false}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

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
