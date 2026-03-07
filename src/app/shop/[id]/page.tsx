import Recommendations from "@/components/Home/Recommendations";
import ProductCart from "@/components/Shop/ProductCart";
import ProductDescription from "@/components/Shop/ProductDescription";
import { getProducts } from "@/lib/api";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const result = await getProducts();
  const product = result?.data?.find((item: any) => item.id === id);

  console.log("Single Products", product);

  return (
    <div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-2">
          <ProductDescription
            images={product?.images}
            name={product?.name}
            description={product?.description}
            keywords={product?.keywords}
          />
        </div>
        <div className="col-span-1">
          <ProductCart
            rating={product?.rating}
            reviewCount={product?.reviewCount}
            sizes={product?.sizes}
            price={product?.price}
            discountPrice={product?.discountPrice}
            productId={product?.id}
            tax={product?.tax}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
