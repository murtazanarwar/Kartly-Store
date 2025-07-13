import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";

import Gallery from "@/components/gallery/index";
import Info from "@/components/info";
import ProductList from "@/components/product-list";
import Review from "@/components/review";
import Container from "@/components/ui/container";

interface ProductPageProps {
    params: Promise<{
        productId: string;
    }>
}


const ProductPage: React.FC<ProductPageProps> = async ({
    params
}) => {
    const { productId } = await params;    
    const product = await getProduct(productId);
    const suggestedProduct = await getProducts({
        categoryId: product?.category?.id
    })

    return (
        <div className="bg-white">
            <Container>
                <div className="px-4 py-10 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:space-x-8">
                        {/* <div>Galery</div> */}
                        <Gallery images={product.images} />
                        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                            <Info data={product} />
                        </div>
                    </div>
                    <hr className="my-10" />
                    <ProductList title="Related Items" items={suggestedProduct} />
                    <hr className="my-10" />
                    <Review productId={productId} />
                </div>
            </Container>
        </div>
    )
}

export default ProductPage;