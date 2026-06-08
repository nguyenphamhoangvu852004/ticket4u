import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalHeader from "./components/GlobalHeader";
import Home from "./page/Home";
import About from "./page/About";
import Contact from "./page/Contact";

export default function GlobalLayout() {
  return (
    <>
      <div id="global-layout">
        <GlobalHeader></GlobalHeader>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </BrowserRouter>
        {/* <GlobalFooter></GlobalFooter> */}
      </div>
    </>
  );
}
