export default function Banner() {
  return (
    <div className="bg-[rgb(39,39,42)] text-white">
      <div className="w-[1248px] mr-auto ml-auto pt-[56px] pb-[56px] text-white">
        <div className="flex items-center justify-center gap-[16px]">
          <div className="w-[152px] h-[152px] p-[6px]">
            <div className="w-full h-full rounded-full overflow-hidden">
              <a href="#" className="block w-full h-full">
                <img
                  src="https://placehold.co/140"
                  alt="Name"
                  className="w-full h-full object-cover"
                />
              </a>
            </div>
          </div>

          {/* TODO: Add the rest of the content */}
        </div>
      </div>
    </div>
  );
}
