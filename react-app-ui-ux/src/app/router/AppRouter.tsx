import { Routes, Route } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import HomePage from "../../pages/HomePage";
import AboutPage from "../../pages/AboutPage";
import ContactPage from "../../pages/ContactPage";
import ProductDetailPage from "../../pages/ProductDetailPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
}
