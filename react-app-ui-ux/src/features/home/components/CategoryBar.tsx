
import { CATEGORIES } from "../../../constants/categories";
import { Link } from "react-router-dom";

export default function CategoryBar() {
  return (
    <div className="h-full text-white">
      <div className="bg-[rgb(0,0,0)] w-full h-[60px]">
        <div className="mr-[276px] ml-[276px] pl-[16px] pr-[16px] h-full">
          <div
            id="catgories-content"
            className="flex items-center justify-start h-full gap-[36px] pl-[28px] pr-[28px]"
          >
            {CATEGORIES.map((category) => (
              <div key={category.label}>
                <Link to={category.href} className="cursor-pointer hover:text-[rgb(45,194,117)] transition-all duration-400">
                  {category.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
