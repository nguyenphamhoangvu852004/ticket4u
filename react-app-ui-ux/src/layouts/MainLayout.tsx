import { Outlet } from "react-router-dom";
import GlobalHeader from "../components/GlobalHeader";
import GlobalFooter from "../components/GlobalFooter";

export default function MainLayout() {
  return (
    <div id="global-layout" className="bg-[rgb(39,39,42)] text-white">
      <GlobalHeader />
      <main>
        <Outlet />
      </main>
      <GlobalFooter />
    </div>
  );
}
