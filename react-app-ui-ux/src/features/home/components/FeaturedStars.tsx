import { featuredStars } from "../data/homeData";
import SectionHeader from "../../../ui/SectionHeader";
import tick from "../../../assets/tick.png";

export default function FeaturedStars() {
  return (
    <div
      className="w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://salt.tkbcdn.com/ts/ds/9d/b8/1e/8ce13481fedd70d375afce988956d9cc.jpg')",
      }}
    >
      <div className="w-[1248px] mr-auto ml-auto pt-[56px] pb-[56px] text-white">
        <SectionHeader title="Featured Stars" emoji="⭐" />

        <div className="flex justify-start gap-[16px]">
          {featuredStars.map((star, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center border border-white rounded-[18px] pb-[5px] backdrop-blur-xs bg-green-400/10"
            >
              <div className="w-[152px] h-[152px] p-[6px]">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <a href="#" className="block w-full h-full">
                    <img
                      src={star.imageUrl}
                      alt={star.name}
                      className="w-full h-full object-cover"
                    />
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-center gap-[6px] text-[14px]">
                <p>{star.name}</p>
                {star.verified && (
                  <img
                    src={tick}
                    alt="verified"
                    className="w-[16px] h-[16px]"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
