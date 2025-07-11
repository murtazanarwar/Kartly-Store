import Billboard from "@/components/billboard"
import Container from "@/components/ui/container"
import getBillboards from "@/actions/get-billboards";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";

export const revalidate = 0;


const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const billboards = await getBillboards("b48d63ad-5810-4612-aa0b-eb49fa9da22d");
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