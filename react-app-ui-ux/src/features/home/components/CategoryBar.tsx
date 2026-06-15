import { useEffect, useState } from "react";
import { BASE_URL_SERVICE } from "../../../constants/api";
import { Link } from "react-router-dom";

export type Category = {
  id: string;
  title: string;
  href: string;
};

export default function CategoryBar() {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(BASE_URL_SERVICE + "/categories");
        const data = await res.json();

        setCategories(data.data.categories);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="h-full text-white">
      <div className="bg-[rgb(0,0,0)] w-full h-[60px]">
        <div className="mr-[276px] ml-[276px] pl-[16px] pr-[16px] h-full">
          <div
            id="catgories-content"
            className="flex items-center justify-start h-full gap-[36px] pl-[28px] pr-[28px]"
          >
            {categories.map((category) => (
              <div key={category.id}>
                <Link
                  to={category.href}
                  className="cursor-pointer hover:text-[rgb(45,194,117)] transition-all duration-400"
                >
                  {category.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
