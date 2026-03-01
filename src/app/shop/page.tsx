import AllProducts from "@/components/Shop/AllProducts";
import Categories from "@/components/Shop/Categories";
import MobileCategories from "@/components/Shop/MobileCategories";
import React from "react";

const page = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 py-6">
      <div className="hidden lg:block col-span-1">
        <Categories />
      </div>
      <div className="w-full lg:hidden">
        <MobileCategories />
      </div>
      <div className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-3 2xl:col-span-4">
        <AllProducts />
      </div>
    </div>
  );
};

export default page;
