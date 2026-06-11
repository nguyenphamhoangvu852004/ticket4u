export default function Banner() {
  return (
    <>
      <div className="w-full h-[522px] pt-[32px] pb-[32px] pr-[16px] pl-[16px]  bg-[linear-gradient(rgb(39,39,42)_48.04%,rgb(0,0,0)_100%)] font-inter">
        <div className="rounded-[24px] bg-amber-500 h-full ml-[274px] mr-[274px] flex overflow-hidden ">
          <div className="text-wrapper bg-[rgb(56,56,61)] flex flex-col justify-between grow-1 shrink-1 basis-0 h-full p-[30px]">
            <div className="info">
              <div className=" w-[406px] text-[18px] font-bold line-clamp-2 ">
                Liveshow Góc Ban Công: Vệt nắng - TUẤN HƯNG, QUẢ DƯA HẤU, LỆ
                QUYÊN, PHÚC TIỆP, ĐĂNG KHÔI, HÀ ANH,...
              </div>
              <div className="text-[rgb(45,194,117)] font-semibold flex flex-row gap-2 items-start mt-[16px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  className="icon"
                >
                  <g
                    clip-path="url(#calendar-detail_svg__clip0_598_432875)"
                    fill="#fff"
                  >
                    <path d="M6.25 0a1 1 0 011 1v1h6V1a1 1 0 112 0v1h1a4 4 0 014 4v2h-20V6a4 4 0 014-4h1V1a1 1 0 011-1zM20.25 10h-20v8a2 2 0 002 2h16a2 2 0 002-2v-8z"></path>
                  </g>
                  <defs>
                    <clipPath id="calendar-detail_svg__clip0_598_432875">
                      <path
                        fill="#fff"
                        transform="translate(.25)"
                        d="M0 0h20v20H0z"
                      ></path>
                    </clipPath>
                  </defs>
                </svg>
                <p className="text-[12px] font-bold">
                  20:00 - 22:00, 13 Jun, 2026
                </p>
              </div>
              <div className="mt-[16px]">
                <div className="flex flex-row gap-1 items-center">
                  <svg
                    width="22"
                    height="28"
                    viewBox="0 0 22 28"
                    xmlns="http://www.w3.org/2000/svg"
                    id="location-icon"
                    className=" text-[rgb(255,255,255)] fill-[rgb(255,255,255]) stroke-[rgb(255,255,255)] transform scale-[0.65] "
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.031 3.307a10.514 10.514 0 0113.937 0c4.485 3.945 4.955 10.854 1.058 15.392l-7.015 8.17a1.333 1.333 0 01-2.023 0l-7.015-8.17C-.923 14.161-.454 7.252 4.031 3.307zM11 14.667A3.333 3.333 0 1011 8a3.333 3.333 0 000 6.666z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <h6 className="text-[rgb(45,194,117)] font-semibold text-[12px]">
                    Hội trường Trung tâm Văn hoá Thể thao Quần Ngựa
                  </h6>
                </div>
                <p className="text-[rgb(196,196,207)] ml-[24px] text-[12px]">
                  so 55, Doc Ngu, Ngoc Ha Ward, Ha Noi City
                </p>
              </div>
            </div>
            <div className="price">
              <div className="flex flex-row gap-2 items-center border-t-[1px] border-solid border-[rgb(196,196,207)] pt-[16px] pb-[16px]">
                <p className="text-[18px] font-bold">From </p>
                <p className=" text-[rgb(45,194,117)] text-[24px] font-semibold">{`1.500.000 đ >`}</p>
              </div>
              <div className=" text-center">
                <button className="w-full h-full text-[14px] bg-[rgba(255,255,255,0.314)] text-[rgba(0,0,0,0.5)] rounded-[4px] font-bold pt-[8px] pb-[8px]">
                  Online booking closed
                </button>
              </div>
            </div>
          </div>
          <div className=" bg-amber-950 h-full">
            <img
              className="h-full"
              src="
            	https://salt.tkbcdn.com/ts/ds/52/96/35/b73cf6db01fa3541951377c518182f15.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
