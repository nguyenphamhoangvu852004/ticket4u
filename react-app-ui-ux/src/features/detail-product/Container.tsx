export default function Container() {
  return (
    <>
      <div className="w-full h-[1000px] bg-[rgb(0,0,0)]">
        <div className="grid grid-cols-10 max-w-[1283px] h-full border-1 border-solid border-white mx-auto">
          <div className="col-span-7  mr-[16px] ml-[16px] mt-[26px] ">
            <div className="aboutSection w-full overflow-hidden rounded-[12px]">
              <div className="about w-full bg-[rgb(35,37,44)]">
                <h4 className="text-[rgb(46,194,116)] font-bold p-[12px]">
                  About
                </h4>
              </div>
              <div className="detailAbout bg-[rgb(49,53,62)] p-[12px]">
                <p className="mt-[10px] mb-[10px]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                </p>

                <p className="mt-[10px] mb-[10px]">
                  illum voluptates nam at animi saepe velit illo culpa.
                </p>
                <p className="mt-[10px] mb-[10px]">
                  Praesentium cumque explicabo veniam perferendis rerum est
                </p>
                <p className="mt-[10px] mb-[10px]">
                  officia iste. Culpa, deserunt laudantium.
                </p>
                <div className="flex w-full justify-center pt-[16px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 292.362 292.362"
                    className="text-[rgb(255,255,255)] fill-[rgb(255,255,255]) stroke-[rgb(255,255,255)] h-[14px] w-[14px] "
                  >
                    <path
                      d="M286.935 69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952 0-9.233 1.807-12.85 5.424C1.807 72.998 0 77.279 0 82.228c0 4.948 1.807 9.229 5.424 12.847l127.907 127.907c3.621 3.617 7.902 5.428 12.85 5.428s9.233-1.811 12.847-5.428L286.935 95.074c3.613-3.617 5.427-7.898 5.427-12.847 0-4.948-1.814-9.229-5.427-12.85z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="scheduleSection">
              <div className="schedule">askljas;lkdj</div>
            </div>
            <div className="organizerSection">
              <div className="organizer">kjljsaldj</div>
            </div>
          </div>
          <div className="col-span-3 border-1 border-solid border-white mr-[16px] ml-[16px] mt-[26px]">
            <div className="advertise">quang cao ne</div>
          </div>
        </div>
      </div>
    </>
  );
}
