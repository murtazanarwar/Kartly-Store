import Billboard from "@/components/billboard"
import Container from "@/components/ui/container"
import getBillboards from "@/actions/get-billboards";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";

export const revalidate = 0;


const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const billboards = await getBillboards("49389be1-4e7c-4bf7-9448-b3a491a5f323");
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboards} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  )
}

export default HomePage