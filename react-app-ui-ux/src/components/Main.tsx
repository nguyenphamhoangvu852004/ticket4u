import tick from "../assets/tick.png";
export default function Main() {
  return (
    <>
      <div className="bg-[rgb(39,39,42)]  text-white ">
        <div className="bg-[rgb(0,0,0)] w-full h-[60px] ">
          <div className=" mr-[276px] ml-[276px] pl-[16px] pr-[16px] h-full ">
            <div
              id="catgories-content"
              className="flex items-center justify-start h-full gap-[36px] pl-[28px] pr-[28px]"
            >
              <div>
                <span>Music</span>
              </div>
              <div>
                <span>Theater & Art</span>
              </div>
              <div>
                <span>Sport</span>
              </div>
            </div>
          </div>
        </div>

        {/* two banners */}
        <div className=" flex justify-center">
          <div className="">
            <div className="flex justify-center items-center w-[1248px] h-[364px] gap-[10px] mt-[20px] relative">
              <div className="w-full h h-full text-white border-1 border-solid border-white rounded-[12px]">
                video A
              </div>
              <div className="w-full h-full text-white border-1 border-solid border-white rounded-[12px]">
                video B
              </div>
            </div>
            <div className="text-white text-center text-[24px]">....</div>
          </div>
        </div>

        {/* featerured starts */}
        <div
          className="w-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://salt.tkbcdn.com/ts/ds/9d/b8/1e/8ce13481fedd70d375afce988956d9cc.jpg')",
          }}
        >
          <div
            id="featured-stars"
            className="w-[1248px] mr-auto ml-auto pt-[56px] pb-[56px]"
          >
            <div className="flex justify-between mb-[16px]">
              <div
                id="titleName"
                className="font-bold text-[16px] flex items-center justify-start"
              >
                <p className="text-[21px]">⭐</p>
                <p>Featured Stars</p>
              </div>
              <div id="title" className="text-gray-400 font-semibold">
                {`View more >`}
              </div>
            </div>

            <div className="flex justify-start gap-[16px]">
              <div className="flex flex-col items-center border border-white rounded-[18px] pb-[5px] backdrop-blur-xs bg-green-400/10">
                <div className="w-[152px] h-[152px] p-[6px]">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <a href="" className="block w-full h-full">
                      <img
                        src="https://placehold.co/140"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-[6px] text-[14px]  items-center">
                  <p className="">Name </p>
                  <img src={tick} alt="" className="w-[16px] h-[16px]" />
                </div>
              </div>
              <div className="flex flex-col items-center border border-white rounded-[18px] pb-[5px] backdrop-blur-xs bg-green-400/10">
                <div className="w-[152px] h-[152px] p-[6px]">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <a href="" className="block w-full h-full">
                      <img
                        src="https://placehold.co/140"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-[6px] text-[14px]  items-center">
                  <p className="">Name </p>
                  <img src={tick} alt="" className="w-[16px] h-[16px]" />
                </div>
              </div>
              <div className="flex flex-col items-center border border-white rounded-[18px] pb-[5px] backdrop-blur-xs bg-green-400/10">
                <div className="w-[152px] h-[152px] p-[6px]">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <a href="" className="block w-full h-full">
                      <img
                        src="https://placehold.co/140"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-[6px] text-[14px]  items-center">
                  <p className="">Name </p>
                  <img src={tick} alt="" className="w-[16px] h-[16px]" />
                </div>
              </div>
              <div className="flex flex-col items-center border border-white rounded-[18px] pb-[5px] backdrop-blur-xs bg-green-400/10">
                <div className="w-[152px] h-[152px] p-[6px]">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <a href="" className="block w-full h-full">
                      <img
                        src="https://placehold.co/140"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-[6px] text-[14px]  items-center">
                  <p className="">Name </p>
                  <img src={tick} alt="" className="w-[16px] h-[16px]" />
                </div>
              </div>
              <div className="flex flex-col items-center border border-white rounded-[18px] pb-[5px] backdrop-blur-xs bg-green-400/10">
                <div className="w-[152px] h-[152px] p-[6px]">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <a href="" className="block w-full h-full">
                      <img
                        src="https://placehold.co/140"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-[6px] text-[14px]  items-center">
                  <p className="">Name </p>
                  <img src={tick} alt="" className="w-[16px] h-[16px]" />
                </div>
              </div>
              <div className="flex flex-col items-center border border-white rounded-[18px] pb-[5px] backdrop-blur-xs bg-green-400/10">
                <div className="w-[152px] h-[152px] p-[6px]">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <a href="" className="block w-full h-full">
                      <img
                        src="https://placehold.co/140"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-[6px] text-[14px]  items-center">
                  <p className="">Name </p>
                  <img src={tick} alt="" className="w-[16px] h-[16px]" />
                </div>
              </div>
              <div className="flex flex-col items-center border border-white rounded-[18px] pb-[5px] backdrop-blur-xs bg-green-400/10">
                <div className="w-[152px] h-[152px] p-[6px]">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <a href="" className="block w-full h-full">
                      <img
                        src="https://placehold.co/140"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-[6px] text-[14px]  items-center">
                  <p className="">Name </p>
                  <img src={tick} alt="" className="w-[16px] h-[16px]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Special events */}
        <div
          id="special-events"
          className="w-[1248px] mx-auto mt-[56px] mb-[56px]"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-[16px]">
            <div id="titleName" className="font-bold text-[16px]">
              Special events
            </div>

            {/* <div
              id="title"
              className="text-gray-400 font-semibold cursor-pointer"
            >
              {`View more >`}
            </div> */}
          </div>

          {/* Cards container */}
          <div className="flex gap-[16px] ">
            <div className="w-[260px] h-[350px] shrink-0 rounded-[18px]  overflow-hidden">
              <a href="" className="block w-full h-full">
                <img
                  src="https://placehold.co/304x160"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </a>
            </div>

            <div className="w-[260px] h-[350px] shrink-0 rounded-[18px]  overflow-hidden">
              <a href="" className="block w-full h-full">
                <img
                  src="https://placehold.co/304x160"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </a>
            </div>
            <div className="w-[260px] h-[350px] shrink-0 rounded-[18px]  overflow-hidden">
              <a href="" className="block w-full h-full">
                <img
                  src="https://placehold.co/304x160"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </a>
            </div>
            <div className="w-[260px] h-[350px] shrink-0 rounded-[18px]  overflow-hidden">
              <a href="" className="block w-full h-full">
                <img
                  src="https://placehold.co/304x160"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Trending events */}
        <div
          id="trending-events"
          className="w-[1248px] mx-auto mt-[56px] mb-[56px] "
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-[16px]">
            <div
              id="titleName"
              className="font-bold text-[16px] flex items-center"
            >
              <p className="text-[21px]">🔥</p>
              <p> Trending events</p>
            </div>
          </div>

          {/* Cards container */}
          <div className="flex gap-[16px] ">
            <div className="w-[346px] h-[164px] shrink-0 rounded-[18px]  flex items-end">
              <p className="text-[76px] shrink-0 leading-[0.8]">1</p>

              <div className="flex-1 h-full rounded-[18px] overflow-hidden">
                <a href="" className="block w-full h-full">
                  <img
                    src="https://placehold.co/304x160"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </a>
              </div>
            </div>
            <div className="w-[346px] h-[164px] shrink-0 rounded-[18px]  flex items-end">
              <p className="text-[76px] shrink-0 leading-[0.8]">2</p>

              <div className="flex-1 h-full rounded-[18px] overflow-hidden">
                <a href="" className="block w-full h-full">
                  <img
                    src="https://placehold.co/304x160"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </a>
              </div>
            </div>
            <div className="w-[346px] h-[164px] shrink-0 rounded-[18px]  flex items-end">
              <p className="text-[76px] shrink-0 leading-[0.8]">3</p>

              <div className="flex-1 h-full rounded-[18px] overflow-hidden">
                <a href="" className="block w-full h-full">
                  <img
                    src="https://placehold.co/304x160"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </a>
              </div>
            </div>
            <div className="w-[346px] h-[164px] shrink-0 rounded-[18px]  flex items-end">
              <p className="text-[76px] shrink-0 leading-[0.8]">4</p>

              <div className="flex-1 h-full rounded-[18px] overflow-hidden">
                <a href="" className="block w-full h-full">
                  <img
                    src="https://placehold.co/304x160"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
