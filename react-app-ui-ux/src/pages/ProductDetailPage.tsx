import Banner from "../features/detail-product/Banner";
import Container from "../features/detail-product/Container";
import CategoryBar from "../features/home/components/CategoryBar";

export default function ProductDetailPage() {
  return (
    <div>
      <CategoryBar />
      <Banner />
      <Container></Container>
    </div>
  );
}
