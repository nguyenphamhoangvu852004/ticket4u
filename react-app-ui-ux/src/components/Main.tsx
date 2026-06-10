import tick from "../assets/tick.png";
import greensm from "../assets/greensm.webp";
import be from "../assets/be.webp";
import shopee from "../assets/shopee.webp";
export default function Main() {
  return (
    <>
      <div className="h-max">
        {/* category bar */}
        <div className=" h-full text-white ">
          <div className="bg-[rgb(0,0,0)] w-full h-[60px] ">
            <div className=" mr-[276px] ml-[276px] pl-[16px] pr-[16px] h-full ">
              <div
                id="catgories-content"
                className="flex items-center justify-start h-full gap-[36px] pl-[28px] pr-[28px] "
              >
                <div>
                  <span className="cursor-pointer hover:text-[rgb(45,194,117)] transition-all duration-400">
                    Music
                  </span>
                </div>
                <div>
                  <span className="cursor-pointer hover:text-[rgb(45,194,117)] transition-all duration-400">
                    Theater & Art
                  </span>
                </div>
                <div>
                  <span className="cursor-pointer hover:text-[rgb(45,194,117)] transition-all duration-400">
                    Sport
                  </span>
                </div>

                <div>
                  <span className="cursor-pointer hover:text-[rgb(45,194,117)] transition-all duration-400">
                    Seminars & Workshops
                  </span>
                </div>
                <div>
                  <span className="cursor-pointer hover:text-[rgb(45,194,117)] transition-all duration-400">
                    Attraction & Experiences
                  </span>
                </div>
                <div>
                  <span className="cursor-pointer hover:text-[rgb(45,194,117)] transition-all duration-400">
                    Others
                  </span>
                </div>
                <div>
                  <span className="cursor-pointer hover:text-[rgb(45,194,117)] transition-all duration-400">
                    Resale ticket
                  </span>
                </div>
                <div>
                  <span className="cursor-pointer hover:text-[rgb(45,194,117)] transition-all duration-400">
                    Blog
                  </span>
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
          {/* ant tap */}

          <div
            id="ant-tap"
            className="mx-auto mt-[56px] mb-[56px] h-[298px] w-[1248px]"
          >
            <div id="ant-tap-list" className="flex justify-between mb-[16px]">
              <div className="">
                <div className="flex gap-[16px]">
                  <div className="cursor-pointer">
                    <p>This weekend</p>
                    <div className=" w-[100%] h-[4px] bg-[rgb(45,194,117)] rounded-[10px]"></div>
                  </div>

                  <div className="cursor-pointer">
                    <p>This month</p>
                    <div className=" w-[100%] h-[4px] bg-[rgb(45,194,117)] rounded-[10px]"></div>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-gray-400 font-semibold">{`View more >`}</p>
              </div>
            </div>

            <div
              id="ant-tap-content-holder"
              className=" flex justify-start gap-[16px]  w-full h-full "
            >
              <div className=" flex flex-col cursor-pointer gap-[1rem] h-full w-[298px] ">
                <div className="itemPicture ">
                  <img
                    className=" w-[300px] h-[166px] rounded-[12px]"
                    src="https://placehold.co/300X166"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <div className="itemTitle max-h-[42px] font-bold">
                    ART WORKSHOP "FRENCH LEMON MINI TARTE"
                  </div>
                  <div className="itemLowestPrice font-semibold text-[rgb(45,194,117)]">
                    From 390.000đ
                  </div>
                  <div className="itemDate flex justify-start items-center gap-[10px]">
                    <div className="itemDateIcon w-[16px] h-[17px] font-normal text-sm">
                      {/* <img src={calendar} alt="" /> */}
                      🗓️
                    </div>
                    <div className="itemDateText">06 May, 2026</div>
                  </div>
                </div>
              </div>
              <div className=" flex flex-col cursor-pointer gap-[1rem] h-full w-[298px]  ">
                <div className="itemPicture ">
                  <img
                    className=" w-[300px] h-[166px] rounded-[12px]"
                    src="https://placehold.co/300X166"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <div className="itemTitle max-h-[42px] font-bold">
                    ART WORKSHOP "FRENCH LEMON MINI TARTE"
                  </div>
                  <div className="itemLowestPrice font-semibold text-[rgb(45,194,117)]">
                    From 390.000đ
                  </div>
                  <div className="itemDate flex justify-start items-center gap-[10px]">
                    <div className="itemDateIcon w-[16px] h-[17px] font-normal text-sm">
                      🗓️
                      {/* <img src={calendar} alt="" /> */}
                    </div>
                    <div className="itemDateText">06 May, 2026</div>
                  </div>
                </div>
              </div>
              <div className=" flex flex-col cursor-pointer gap-[1rem] h-full w-[298px] ">
                <div className="itemPicture text-white ">
                  <img
                    className=" w-[300px] h-[166px] rounded-[12px]"
                    src="https://placehold.co/300X166"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <div className="itemTitle max-h-[42px] font-bold">
                    ART WORKSHOP "FRENCH LEMON MINI TARTE"
                  </div>
                  <div className="itemLowestPrice font-semibold text-[rgb(45,194,117)]">
                    From 390.000đ
                  </div>
                  <div className="itemDate flex justify-start items-center gap-[10px]">
                    <div className="itemDateIcon w-[16px] h-[17px] font-normal text-sm">
                      🗓️
                    </div>
                    <div className="itemDateText">06 May, 2026</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* resale ticket */}
          <div
            id="resale-ticket"
            className="border-box mx-auto relative h-[300px] mt-[96px] mb-[56px] w-[1248px] "
          >
            <div
              className="absolute inset-0 h-full w-full bg-no-repeat "
              style={{
                backgroundImage:
                  "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTE5OSIgaGVpZ2h0PSIyNzMiIHZpZXdCb3g9IjAgMCAxMTk5IDI3MyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUyMy4xNDkgNTUuOTk3NkMzODAuNDk4IDEzLjg0NjcgMTg3LjYxMiA3My41NjA1IDEwOSAxMDguNjg2VjI3Mi41SDgwNUM3NzAuNDg4IDIxNy44OTUgNjY1LjggOTguMTQ4NSA1MjMuMTQ5IDU1Ljk5NzZaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfNTg0M181NTI1MjIpIiBmaWxsLW9wYWNpdHk9IjAuNSIvPgo8cGF0aCBkPSJNMzk0LjUgMTY0LjUwMUMyMDAuOTU3IDkuNjY2NjggODMuNzk4NiAzNS45Mjc0IDguMjIzOTggNjAuMzIzQzMuMjk5NDYgNjEuOTEyNiAwIDY2LjUwOTUgMCA3MS42ODQyVjI2MC41MThDMCAyNjcuMTQ1IDUuMzcyNTcgMjcyLjUxOCAxMiAyNzIuNTE4TDExODEuMTggMjcyLjUxOEMxMTg5LjU2IDI3Mi41MTggMTE5NC42NiAyNjQuMzAyIDExODguNzYgMjU4LjM0NEMxMTYzLjczIDIzMy4wMzcgMTA5Ny42MSAyMDcuNSAxMDAwLjUgMjA3LjVDODAyIDIwNy41IDU4NC41IDMxNi41IDM5NC41IDE2NC41MDFaIiBmaWxsPSJ1cmwoI3BhaW50MV9saW5lYXJfNTg0M181NTI1MjIpIi8+CjxwYXRoIGQ9Ik0yOTIuNSAxMzJDMTczLjE0NiAtMzIuNzM2NSA2MC4xNDk4IDEuMTMzODggMTIuNDY2IDcuNjExNjhDNS43MDA1MSA4LjUzMDc2IDAgMTQuMTk0IDAgMjEuMDIxNlYyNjAuMTk4QzAgMjY2LjgyNSA1LjI4NDg0IDI3Mi4xOTggMTEuOTEyMyAyNzIuMTk4SDczOC45NjZDNzQ2Ljg1NiAyNzIuMTk4IDc1Mi41MDcgMjY0LjU5MSA3NDkuMDE5IDI1Ny41MTNDNjkyLjQ5NiAxNDIuODEgMzgyLjM0MiAyNTYuMDAzIDI5Mi41IDEzMloiIGZpbGw9IiM4M0YzQjkiIGZpbGwtb3BhY2l0eT0iMC41Ii8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfNTg0M181NTI1MjIiIHgxPSIxMDkiIHkxPSI0OC44MzIiIHgyPSI3OTAuNjk2IiB5Mj0iMzA5Ljg1NiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBvZmZzZXQ9IjAuMjI2Nzk4IiBzdG9wLWNvbG9yPSIjMkVDMjc0Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzZBRDMwMCIvPgo8L2xpbmVhckdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MV9saW5lYXJfNTg0M181NTI1MjIiIHgxPSItMy41NDk3NGUtMDUiIHkxPSI2MC4yOTIxIiB4Mj0iNjA1IiB5Mj0iMjcyLjUxNyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBvZmZzZXQ9IjAuMjI2Nzk4IiBzdG9wLWNvbG9yPSIjMkVDMjc0Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzZBRDMwMCIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo=')",
              }}
            />

            <div className="relative z-10 flex justify-start gap-[16px] max-h-[268px]">
              <div className="flex justify-center">
                <img
                  className=""
                  src="https://salt.tkbcdn.com/ts/ds/d8/b7/4e/313ff0caab3c8f518be523da266c0fe7.png"
                  alt=""
                />
              </div>

              <div id="list-resale-ticket" className="flex flex-row gap-[16px]">
                <div className="flex flex-col gap-[14px] p-[12px] max-w-[304px] max-h-[268px] rounded-[12px] backdrop-blur bg-[rgba(86,92,106,0.5)]">
                  <div className="itemPicture text-white ">
                    <img
                      className=" rounded-[12px]"
                      src="https://placehold.co/280X158"
                      alt=""
                    />
                  </div>
                  <div className=" flex flex-col itemInfo gap-[8px] ">
                    <div className="itemTitle max-h-[42px] font-bold">
                      {`[Nhà Hát Bến Thành] Hài kịch: Đảo Hoa Hậu`}
                    </div>
                    <div className="itemDate flex justify-start items-center gap-[10px]">
                      <div className="itemDateIcon w-[16px] h-[17px] font-normal text-sm">
                        🗓️
                      </div>
                      <div className="itemDateText">06 May, 2026</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-[14px]  p-[12px] max-w-[304px] max-h-[268px] rounded-[12px] backdrop-blur bg-[rgba(86,92,106,0.5)]">
                  <div className="itemPicture text-white ">
                    <img
                      className=" rounded-[12px]"
                      src="https://placehold.co/280X158"
                      alt=""
                    />
                  </div>
                  <div className=" flex flex-col itemInfo gap-[8px] ">
                    <div className="itemTitle max-h-[42px] font-bold">
                      {`[Nhà Hát Bến Thành] Hài kịch: Đảo Hoa Hậu`}
                    </div>
                    <div className="itemDate flex justify-start items-center gap-[10px]">
                      <div className="itemDateIcon w-[16px] h-[17px] font-normal text-sm">
                        🗓️
                      </div>
                      <div className="itemDateText">06 May, 2026</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-[14px]  p-[12px] max-w-[304px] max-h-[268px] rounded-[12px] backdrop-blur bg-[rgba(86,92,106,0.5)]">
                  <div className="itemPicture text-white ">
                    <img
                      className=" rounded-[12px]"
                      src="https://placehold.co/280X158"
                      alt=""
                    />
                  </div>
                  <div className=" flex flex-col itemInfo gap-[8px] ">
                    <div className="itemTitle max-h-[42px] font-bold">
                      {`[Nhà Hát Bến Thành] Hài kịch: Đảo Hoa Hậu`}
                    </div>
                    <div className="itemDate flex justify-start items-center gap-[10px]">
                      <div className="itemDateIcon w-[16px] h-[17px] font-normal text-sm">
                        🗓️
                      </div>
                      <div className="itemDateText">06 May, 2026</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* green sm */}
          <div className="mx-auto mt-[56px]  w-[1248px]">
            <div className="w-full h-[180px]">
              <img src={greensm} alt="" className=" rounded-[12px]" />
            </div>
          </div>

          {/* music */}
          <div className="mx-auto mb-[56px] min-h-[298px] w-[1248px]">
            <div className="flex justify-between mb-[16px]">
              <p className="font-bold">Music</p>

              <div>
                <p className="text-gray-400 font-semibold">{`View more >`}</p>
              </div>
            </div>

            <div className=" flex justify-start gap-[16px]  w-full h-full ">
              <div className=" flex flex-col cursor-pointer gap-[1rem] h-full w-[298px] ">
                <div className="itemPicture ">
                  <img
                    className=" w-[300px] h-[166px] rounded-[12px]"
                    src="https://placehold.co/300X166"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <div className="itemTitle max-h-[42px] font-bold">
                    ART WORKSHOP "FRENCH LEMON MINI TARTE"
                  </div>
                  <div className="itemLowestPrice font-semibold text-[rgb(45,194,117)]">
                    From 390.000đ
                  </div>
                  <div className="itemDate flex justify-start items-center gap-[10px]">
                    <div className="itemDateIcon w-[16px] h-[17px] font-normal text-sm">
                      {/* <img src={calendar} alt="" /> */}
                      🗓️
                    </div>
                    <div className="itemDateText">06 May, 2026</div>
                  </div>
                </div>
              </div>
              <div className=" flex flex-col cursor-pointer gap-[1rem] h-full w-[298px] ">
                <div className="itemPicture ">
                  <img
                    className=" w-[300px] h-[166px] rounded-[12px]"
                    src="https://placehold.co/300X166"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <div className="itemTitle max-h-[42px] font-bold">
                    ART WORKSHOP "FRENCH LEMON MINI TARTE"
                  </div>
                  <div className="itemLowestPrice font-semibold text-[rgb(45,194,117)]">
                    From 390.000đ
                  </div>
                  <div className="itemDate flex justify-start items-center gap-[10px]">
                    <div className="itemDateIcon w-[16px] h-[17px] font-normal text-sm">
                      {/* <img src={calendar} alt="" /> */}
                      🗓️
                    </div>
                    <div className="itemDateText">06 May, 2026</div>
                  </div>
                </div>
              </div>
              <div className=" flex flex-col cursor-pointer gap-[1rem] h-full w-[298px]  ">
                <div className="itemPicture ">
                  <img
                    className=" w-[300px] h-[166px] rounded-[12px]"
                    src="https://placehold.co/300X166"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <div className="itemTitle max-h-[42px] font-bold">
                    ART WORKSHOP "FRENCH LEMON MINI TARTE"
                  </div>
                  <div className="itemLowestPrice font-semibold text-[rgb(45,194,117)]">
                    From 390.000đ
                  </div>
                  <div className="itemDate flex justify-start items-center gap-[10px]">
                    <div className="itemDateIcon w-[16px] h-[17px] font-normal text-sm">
                      🗓️
                      {/* <img src={calendar} alt="" /> */}
                    </div>
                    <div className="itemDateText">06 May, 2026</div>
                  </div>
                </div>
              </div>
              <div className=" flex flex-col cursor-pointer gap-[1rem] h-full w-[298px] ">
                <div className="itemPicture text-white ">
                  <img
                    className=" w-[300px] h-[166px] rounded-[12px]"
                    src="https://placehold.co/300X166"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <div className="itemTitle max-h-[42px] font-bold">
                    ART WORKSHOP "FRENCH LEMON MINI TARTE"
                  </div>
                  <div className="itemLowestPrice font-semibold text-[rgb(45,194,117)]">
                    From 390.000đ
                  </div>
                  <div className="itemDate flex justify-start items-center gap-[10px]">
                    <div className="itemDateIcon w-[16px] h-[17px] font-normal text-sm">
                      🗓️
                    </div>
                    <div className="itemDateText">06 May, 2026</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* be */}
          <div className="mx-auto mt-[56px]  w-[1248px]">
            <div className="w-full h-[180px]">
              <img src={be} alt="" className=" rounded-[12px]" />
            </div>
          </div>

          {/* Theaters & Art */}
          <div className="mx-auto mb-[56px] min-h-[298px] w-[1248px]">
            <div className="flex justify-between mb-[16px]">
              <p className="font-bold">Theaters & Art</p>

              <div>
                <p className="text-gray-400 font-semibold">{`View more >`}</p>
              </div>
            </div>

            <div className=" flex justify-start gap-[16px]  w-full h-full ">
              <div className=" flex flex-col cursor-pointer gap-[1rem] h-full w-[298px] ">
                <div className="itemPicture ">
                  <img
                    className=" w-[300px] h-[166px] rounded-[12px]"
                    src="https://placehold.co/300X166"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <div className="itemTitle max-h-[42px] font-bold">
                    ART WORKSHOP "FRENCH LEMON MINI TARTE"
                  </div>
                  <div className="itemLowestPrice font-semibold text-[rgb(45,194,117)]">
                    From 390.000đ
                  </div>
                  <div className="itemDate flex justify-start items-center gap-[10px]">
                    <div className="itemDateIcon w-[16px] h-[17px] font-normal text-sm">
                      {/* <img src={calendar} alt="" /> */}
                      🗓️
                    </div>
                    <div className="itemDateText">06 May, 2026</div>
                  </div>
                </div>
              </div>
              <div className=" flex flex-col cursor-pointer gap-[1rem] h-full w-[298px] ">
                <div className="itemPicture ">
                  <img
                    className=" w-[300px] h-[166px] rounded-[12px]"
                    src="https://placehold.co/300X166"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <div className="itemTitle max-h-[42px] font-bold">
                    ART WORKSHOP "FRENCH LEMON MINI TARTE"
                  </div>
                  <div className="itemLowestPrice font-semibold text-[rgb(45,194,117)]">
                    From 390.000đ
                  </div>
                  <div className="itemDate flex justify-start items-center gap-[10px]">
                    <div className="itemDateIcon w-[16px] h-[17px] font-normal text-sm">
                      {/* <img src={calendar} alt="" /> */}
                      🗓️
                    </div>
                    <div className="itemDateText">06 May, 2026</div>
                  </div>
                </div>
              </div>
              <div className=" flex flex-col cursor-pointer gap-[1rem] h-full w-[298px]  ">
                <div className="itemPicture ">
                  <img
                    className=" w-[300px] h-[166px] rounded-[12px]"
                    src="https://placehold.co/300X166"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <div className="itemTitle max-h-[42px] font-bold">
                    ART WORKSHOP "FRENCH LEMON MINI TARTE"
                  </div>
                  <div className="itemLowestPrice font-semibold text-[rgb(45,194,117)]">
                    From 390.000đ
                  </div>
                  <div className="itemDate flex justify-start items-center gap-[10px]">
                    <div className="itemDateIcon w-[16px] h-[17px] font-normal text-sm">
                      🗓️
                      {/* <img src={calendar} alt="" /> */}
                    </div>
                    <div className="itemDateText">06 May, 2026</div>
                  </div>
                </div>
              </div>
              <div className=" flex flex-col cursor-pointer gap-[1rem] h-full w-[298px] ">
                <div className="itemPicture text-white ">
                  <img
                    className=" w-[300px] h-[166px] rounded-[12px]"
                    src="https://placehold.co/300X166"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <div className="itemTitle max-h-[42px] font-bold">
                    ART WORKSHOP "FRENCH LEMON MINI TARTE"
                  </div>
                  <div className="itemLowestPrice font-semibold text-[rgb(45,194,117)]">
                    From 390.000đ
                  </div>
                  <div className="itemDate flex justify-start items-center gap-[10px]">
                    <div className="itemDateIcon w-[16px] h-[17px] font-normal text-sm">
                      🗓️
                    </div>
                    <div className="itemDateText">06 May, 2026</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* shopee */}
          <div className="mx-auto mt-[56px]  w-[1248px]">
            <div className="w-full h-[180px]">
              <img src={shopee} alt="" className=" rounded-[12px]" />
            </div>
          </div>
          {/* Seminars & Workshops */}
          <div className="mx-auto mb-[56px] min-h-[298px] w-[1248px]">
            <div className="flex justify-between mb-[16px]">
              <p className="font-bold">Seminars & Workshops</p>

              <div>
                <p className="text-gray-400 font-semibold">{`View more >`}</p>
              </div>
            </div>

            <div className=" flex justify-start gap-[16px]  w-full h-full ">
              <div className=" flex flex-col cursor-pointer gap-[1rem] h-full w-[298px] ">
                <div className="itemPicture ">
                  <img
                    className=" w-[300px] h-[166px] rounded-[12px]"
                    src="https://placehold.co/300X166"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <div className="itemTitle max-h-[42px] font-bold">
                    ART WORKSHOP "FRENCH LEMON MINI TARTE"
                  </div>
                  <div className="itemLowestPrice font-semibold text-[rgb(45,194,117)]">
                    From 390.000đ
                  </div>
                  <div className="itemDate flex justify-start items-center gap-[10px]">
                    <div className="itemDateIcon w-[16px] h-[17px] font-normal text-sm">
                      {/* <img src={calendar} alt="" /> */}
                      🗓️
                    </div>
                    <div className="itemDateText">06 May, 2026</div>
                  </div>
                </div>
              </div>
              <div className=" flex flex-col cursor-pointer gap-[1rem] h-full w-[298px] ">
                <div className="itemPicture ">
                  <img
                    className=" w-[300px] h-[166px] rounded-[12px]"
                    src="https://placehold.co/300X166"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <div className="itemTitle max-h-[42px] font-bold">
                    ART WORKSHOP "FRENCH LEMON MINI TARTE"
                  </div>
                  <div className="itemLowestPrice font-semibold text-[rgb(45,194,117)]">
                    From 390.000đ
                  </div>
                  <div className="itemDate flex justify-start items-center gap-[10px]">
                    <div className="itemDateIcon w-[16px] h-[17px] font-normal text-sm">
                      {/* <img src={calendar} alt="" /> */}
                      🗓️
                    </div>
                    <div className="itemDateText">06 May, 2026</div>
                  </div>
                </div>
              </div>
              <div className=" flex flex-col cursor-pointer gap-[1rem] h-full w-[298px]  ">
                <div className="itemPicture ">
                  <img
                    className=" w-[300px] h-[166px] rounded-[12px]"
                    src="https://placehold.co/300X166"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <div className="itemTitle max-h-[42px] font-bold">
                    ART WORKSHOP "FRENCH LEMON MINI TARTE"
                  </div>
                  <div className="itemLowestPrice font-semibold text-[rgb(45,194,117)]">
                    From 390.000đ
                  </div>
                  <div className="itemDate flex justify-start items-center gap-[10px]">
                    <div className="itemDateIcon w-[16px] h-[17px] font-normal text-sm">
                      🗓️
                      {/* <img src={calendar} alt="" /> */}
                    </div>
                    <div className="itemDateText">06 May, 2026</div>
                  </div>
                </div>
              </div>
              <div className=" flex flex-col cursor-pointer gap-[1rem] h-full w-[298px] ">
                <div className="itemPicture text-white ">
                  <img
                    className=" w-[300px] h-[166px] rounded-[12px]"
                    src="https://placehold.co/300X166"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <div className="itemTitle max-h-[42px] font-bold">
                    ART WORKSHOP "FRENCH LEMON MINI TARTE"
                  </div>
                  <div className="itemLowestPrice font-semibold text-[rgb(45,194,117)]">
                    From 390.000đ
                  </div>
                  <div className="itemDate flex justify-start items-center gap-[10px]">
                    <div className="itemDateIcon w-[16px] h-[17px] font-normal text-sm">
                      🗓️
                    </div>
                    <div className="itemDateText">06 May, 2026</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Attractions & Experiences*/}
          <div className="mx-auto mb-[56px] min-h-[298px] w-[1248px]">
            <div className="flex justify-between mb-[16px]">
              <p className="font-bold">Attractions & Experiences</p>

              <div>
                <p className="text-gray-400 font-semibold">{`View more >`}</p>
              </div>
            </div>

            <div className=" flex justify-start gap-[16px]  w-full h-full ">
              <div className=" flex flex-col cursor-pointer gap-[1rem] h-full w-[298px] ">
                <div className="itemPicture ">
                  <img
                    className=" w-[300px] h-[166px] rounded-[12px]"
                    src="https://placehold.co/300X166"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <div className="itemTitle max-h-[42px] font-bold">
                    ART WORKSHOP "FRENCH LEMON MINI TARTE"
                  </div>
                  <div className="itemLowestPrice font-semibold text-[rgb(45,194,117)]">
                    From 390.000đ
                  </div>
                  <div className="itemDate flex justify-start items-center gap-[10px]">
                    <div className="itemDateIcon w-[16px] h-[17px] font-normal text-sm">
                      {/* <img src={calendar} alt="" /> */}
                      🗓️
                    </div>
                    <div className="itemDateText">06 May, 2026</div>
                  </div>
                </div>
              </div>
              <div className=" flex flex-col cursor-pointer gap-[1rem] h-full w-[298px] ">
                <div className="itemPicture ">
                  <img
                    className=" w-[300px] h-[166px] rounded-[12px]"
                    src="https://placehold.co/300X166"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <div className="itemTitle max-h-[42px] font-bold">
                    ART WORKSHOP "FRENCH LEMON MINI TARTE"
                  </div>
                  <div className="itemLowestPrice font-semibold text-[rgb(45,194,117)]">
                    From 390.000đ
                  </div>
                  <div className="itemDate flex justify-start items-center gap-[10px]">
                    <div className="itemDateIcon w-[16px] h-[17px] font-normal text-sm">
                      {/* <img src={calendar} alt="" /> */}
                      🗓️
                    </div>
                    <div className="itemDateText">06 May, 2026</div>
                  </div>
                </div>
              </div>
              <div className=" flex flex-col cursor-pointer gap-[1rem] h-full w-[298px]  ">
                <div className="itemPicture ">
                  <img
                    className=" w-[300px] h-[166px] rounded-[12px]"
                    src="https://placehold.co/300X166"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <div className="itemTitle max-h-[42px] font-bold">
                    ART WORKSHOP "FRENCH LEMON MINI TARTE"
                  </div>
                  <div className="itemLowestPrice font-semibold text-[rgb(45,194,117)]">
                    From 390.000đ
                  </div>
                  <div className="itemDate flex justify-start items-center gap-[10px]">
                    <div className="itemDateIcon w-[16px] h-[17px] font-normal text-sm">
                      🗓️
                      {/* <img src={calendar} alt="" /> */}
                    </div>
                    <div className="itemDateText">06 May, 2026</div>
                  </div>
                </div>
              </div>
              <div className=" flex flex-col cursor-pointer gap-[1rem] h-full w-[298px] ">
                <div className="itemPicture text-white ">
                  <img
                    className=" w-[300px] h-[166px] rounded-[12px]"
                    src="https://placehold.co/300X166"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <div className="itemTitle max-h-[42px] font-bold">
                    ART WORKSHOP "FRENCH LEMON MINI TARTE"
                  </div>
                  <div className="itemLowestPrice font-semibold text-[rgb(45,194,117)]">
                    From 390.000đ
                  </div>
                  <div className="itemDate flex justify-start items-center gap-[10px]">
                    <div className="itemDateIcon w-[16px] h-[17px] font-normal text-sm">
                      🗓️
                    </div>
                    <div className="itemDateText">06 May, 2026</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sports & Others*/}
          <div className="mx-auto mb-[56px] min-h-[298px] w-[1248px]">
            <div className="flex justify-between mb-[16px]">
              <p className="font-bold">Sports & Others</p>

              <div>
                <p className="text-gray-400 font-semibold">{`View more >`}</p>
              </div>
            </div>

            <div className=" flex justify-start gap-[16px]  w-full h-full ">
              <div className=" flex flex-col cursor-pointer gap-[1rem] h-full w-[298px] ">
                <div className="itemPicture ">
                  <img
                    className=" w-[300px] h-[166px] rounded-[12px]"
                    src="https://placehold.co/300X166"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <div className="itemTitle max-h-[42px] font-bold">
                    ART WORKSHOP "FRENCH LEMON MINI TARTE"
                  </div>
                  <div className="itemLowestPrice font-semibold text-[rgb(45,194,117)]">
                    From 390.000đ
                  </div>
                  <div className="itemDate flex justify-start items-center gap-[10px]">
                    <div className="itemDateIcon w-[16px] h-[17px] font-normal text-sm">
                      {/* <img src={calendar} alt="" /> */}
                      🗓️
                    </div>
                    <div className="itemDateText">06 May, 2026</div>
                  </div>
                </div>
              </div>
              <div className=" flex flex-col cursor-pointer gap-[1rem] h-full w-[298px] ">
                <div className="itemPicture ">
                  <img
                    className=" w-[300px] h-[166px] rounded-[12px]"
                    src="https://placehold.co/300X166"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <div className="itemTitle max-h-[42px] font-bold">
                    ART WORKSHOP "FRENCH LEMON MINI TARTE"
                  </div>
                  <div className="itemLowestPrice font-semibold text-[rgb(45,194,117)]">
                    From 390.000đ
                  </div>
                  <div className="itemDate flex justify-start items-center gap-[10px]">
                    <div className="itemDateIcon w-[16px] h-[17px] font-normal text-sm">
                      {/* <img src={calendar} alt="" /> */}
                      🗓️
                    </div>
                    <div className="itemDateText">06 May, 2026</div>
                  </div>
                </div>
              </div>
              <div className=" flex flex-col cursor-pointer gap-[1rem] h-full w-[298px]  ">
                <div className="itemPicture ">
                  <img
                    className=" w-[300px] h-[166px] rounded-[12px]"
                    src="https://placehold.co/300X166"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <div className="itemTitle max-h-[42px] font-bold">
                    ART WORKSHOP "FRENCH LEMON MINI TARTE"
                  </div>
                  <div className="itemLowestPrice font-semibold text-[rgb(45,194,117)]">
                    From 390.000đ
                  </div>
                  <div className="itemDate flex justify-start items-center gap-[10px]">
                    <div className="itemDateIcon w-[16px] h-[17px] font-normal text-sm">
                      🗓️
                      {/* <img src={calendar} alt="" /> */}
                    </div>
                    <div className="itemDateText">06 May, 2026</div>
                  </div>
                </div>
              </div>
              <div className=" flex flex-col cursor-pointer gap-[1rem] h-full w-[298px] ">
                <div className="itemPicture text-white ">
                  <img
                    className=" w-[300px] h-[166px] rounded-[12px]"
                    src="https://placehold.co/300X166"
                    alt=""
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <div className="itemTitle max-h-[42px] font-bold">
                    ART WORKSHOP "FRENCH LEMON MINI TARTE"
                  </div>
                  <div className="itemLowestPrice font-semibold text-[rgb(45,194,117)]">
                    From 390.000đ
                  </div>
                  <div className="itemDate flex justify-start items-center gap-[10px]">
                    <div className="itemDateIcon w-[16px] h-[17px] font-normal text-sm">
                      🗓️
                    </div>
                    <div className="itemDateText">06 May, 2026</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Exciting destination */}
          <div className="mx-auto min-h-[298px] w-[1248px] mt-[16px]">
            <div className="flex justify-between mb-[16px]">
              <p className="font-bold">Exciting destination</p>
            </div>

            <div className="flex flex-row justify-start gap-[16px]">
              <div className="relative w-[298px] h-[300px] rounded-[12px] overflow-hidden cursor-pointer">
                {/* Image */}
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src="https://placehold.co/300x298"
                  alt=""
                />

                {/* Green overlay */}
                <div
                  className="
      absolute
      inset-0
      bg-gradient-to-t
      from-[rgba(45,194,117,0.85)]
      via-[rgba(45,194,117,0.25)]
      to-transparent
    "
                />

                {/* Text */}
                <div
                  className="
      absolute
      bottom-[24px]
      left-[16px]
      z-10
      text-white
      font-bold
      text-[24px]
    "
                >
                  Ho Chi Minh City
                </div>
              </div>
              <div className="relative w-[298px] h-[300px] rounded-[12px] overflow-hidden cursor-pointer">
                {/* Image */}
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src="https://placehold.co/300x298"
                  alt=""
                />

                {/* Green overlay */}
                <div
                  className="
      absolute
      inset-0
      bg-gradient-to-t
      from-[rgba(45,194,117,0.85)]
      via-[rgba(45,194,117,0.25)]
      to-transparent
    "
                />

                {/* Text */}
                <div
                  className="
      absolute
      bottom-[24px]
      left-[16px]
      z-10
      text-white
      font-bold
      text-[24px]
    "
                >
                  Ha Noi
                </div>
              </div>
              <div className="relative w-[298px] h-[300px] rounded-[12px] overflow-hidden cursor-pointer">
                {/* Image */}
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src="https://placehold.co/300x298"
                  alt=""
                />

                {/* Green overlay */}
                <div
                  className="
      absolute
      inset-0
      bg-gradient-to-t
      from-[rgba(45,194,117,0.85)]
      via-[rgba(45,194,117,0.25)]
      to-transparent
    "
                />

                {/* Text */}
                <div
                  className="
      absolute
      bottom-[24px]
      left-[16px]
      z-10
      text-white
      font-bold
      text-[24px]
    "
                >
                  Dalat city
                </div>
              </div>
              <div className="relative w-[298px] h-[300px] rounded-[12px] overflow-hidden cursor-pointer">
                {/* Image */}
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src="https://placehold.co/300x298"
                  alt=""
                />

                {/* Green overlay */}
                <div
                  className="
      absolute
      inset-0
      bg-gradient-to-t
      from-[rgba(45,194,117,0.85)]
      via-[rgba(45,194,117,0.25)]
      to-transparent
    "
                />

                {/* Text */}
                <div
                  className="
      absolute
      bottom-[24px]
      left-[16px]
      z-10
      text-white
      font-bold
      text-[24px]
    "
                >
                  Other locations
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
