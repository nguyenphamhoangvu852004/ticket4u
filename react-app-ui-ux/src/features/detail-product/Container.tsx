export default function Container() {
  return (
    <>
      <div className="w-full h-[1000px] bg-[rgb(0,0,0)]">
        <div className="grid grid-cols-10 max-w-[1283px] h-full  mx-auto">
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
            <div className="scheduleSection w-full overflow-hidden rounded-[12px] mt-[26px]">
              <div className="about w-full bg-[rgb(35,37,44)]">
                <h4 className="text-[rgb(46,194,116)] font-bold p-[12px]">
                  Schedule
                </h4>
              </div>
              <div className="list bg-[rgb(49,53,62)]">
                <div className="flex justify-start items-center border-solid border-b-[1px] border-b-black p-[12px]">
                  <div className="arrow mr-[16px] w-[20px] h-[20px]">
                    <svg
                      width="60"
                      height="60"
                      viewBox="0 0 60 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ant-collapse-arrow w-[20px] h-[20px] "
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M20.732 13.232a2.5 2.5 0 013.536 0l15 15a2.5 2.5 0 010 3.536l-15 15a2.5 2.5 0 01-3.536-3.536L33.965 30 20.732 16.768a2.5 2.5 0 010-3.536z"
                        fill="#fff"
                      ></path>
                    </svg>
                  </div>
                  <div className="dateTime flex flex-col flex-1">
                    <div className="time">18:30 - 20:00, Mon</div>
                    <div className="date text-[rgb(45,194,117)] font-bold">
                      15 June, 2026
                    </div>
                  </div>
                  <div className="bookNow w-[175px] h-[34px]">
                    <button className="w-full h-full bg-[rgb(45,194,117)] text-white rounded-[4px] font-bold hover:text-black hover:bg-white transition-all ease-in duration-400">
                      Book now
                    </button>
                  </div>
                </div>
                <div className="flex justify-start items-center border-solid border-b-[1px] border-b-black p-[12px]">
                  <div className="arrow mr-[16px] w-[20px] h-[20px] ">
                    <svg
                      width="60"
                      height="60"
                      viewBox="0 0 60 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ant-collapse-arrow w-[20px] h-[20px] "
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M20.732 13.232a2.5 2.5 0 013.536 0l15 15a2.5 2.5 0 010 3.536l-15 15a2.5 2.5 0 01-3.536-3.536L33.965 30 20.732 16.768a2.5 2.5 0 010-3.536z"
                        fill="#fff"
                      ></path>
                    </svg>
                  </div>
                  <div className="dateTime flex flex-col flex-1">
                    <div className="time">18:30 - 20:00, Mon</div>
                    <div className="date text-[rgb(45,194,117)] font-bold">
                      15 June, 2026
                    </div>
                  </div>
                  <div className="bookNow w-[175px] h-[34px]">
                    <button className="w-full h-full bg-[rgb(45,194,117)] text-white rounded-[4px] font-bold hover:text-black hover:bg-white transition-all ease-in duration-400">
                      Book now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="oganizerSection w-full overflow-hidden rounded-[12px] mt-[26px]">
              <div className="about w-full bg-[rgb(35,37,44)]">
                <h4 className="text-[rgb(46,194,116)] font-bold p-[12px]">
                  Organizer
                </h4>
              </div>
              <div className="organizer flex flex-row bg-[rgb(49,53,62)]">
                <div className="logoOganizer h-full w-full m-[8px]">
                  <img
                    src="https://placehold.co/200x200"
                    alt="logo"
                    className="rounded-[16px]"
                  />
                </div>
                <div className="m-[8px]">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad
                  eveniet autem eum error. Voluptatem in maxime cum nisi
                  dolorem. Impedit autem quae debitis ipsa possimus, itaque
                  recusandae ad consequatur cum! Distinctio quidem officiis
                  placeat molestias vero laborum veritatis quibusdam rem,
                  laudantium omnis fuga in aspernatur dolor atque non, dolores
                  accusantium ipsum voluptas quas, eaque iusto nostrum
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3 border-1 border-solid border-white mr-[16px] ml-[16px] mt-[26px]">
            <div className="advertise">
              <img
                src="https://ticketbox.vn/_next/image?url=https%3A%2F%2Fsalt.tkbcdn.com%2Fts%2Fds%2Fb9%2F2a%2Fed%2F3213123f7f84c01b067a4372ca9eacdc.png&w=3840&q=75"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
