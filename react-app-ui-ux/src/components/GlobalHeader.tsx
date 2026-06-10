import Button from "../ui/Button";
import Logo from "../ui/Logo";
import SearchBar from "../ui/SearchBar";
import vietnam from "../assets/vietnam.png";
import { BsTicketDetailed } from "react-icons/bs";
export default function GlobalHeader() {
  return (
    <>
      <div className="flex justify-evenly items-center  border-solid h-[76px] pr-30 pl-25 bg-[rgb(45_194_117)]">
        <Logo></Logo>

        <div className="flex items-center gap-[60px]">
          <SearchBar></SearchBar>
          <div className="flex gap-[20px] text-[14px]  items-center">
            <Button
              title="Create events"
              className="flex justify-center rounded-4xl border border-white text-white p-[6px] pl-8 pr-8 min-w-[170px] min-h-[36px] text-[14px] cursor-pointer 
              hover:bg-[rgb(255,255,255)] transition-all hover:text-[rgb(0,0,0)] transition-all duration-400
              "
            ></Button>

            <div className="flex items-center gap-[6px]">
              <BsTicketDetailed className="text-white w-[24px] h-[24px]" />
              <Button
                title="My ticket"
                className="text-white "
              ></Button>
            </div>
            <div className="flex items-center gap-[36px]">
              <Button
                title="Login | Register"
                className="text-white font-bold"
              ></Button>
              <img src={vietnam} alt="Vietnam Flag" className="w-6 h-6" />
              <Button title=""></Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
