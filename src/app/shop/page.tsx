import AllProducts from "@/components/Shop/AllProducts";
import Categories from "@/components/Shop/Categories";
import MobileCategories from "@/components/Shop/MobileCategories";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-row gap-6">
      <div className="hidden lg:block w-[20%] flex-auto">
        <Categories />
      </div>
      {/* <div className="w-full lg:hidden">
        <MobileCategories />
      </div> */}
      <div className="w-[80%] flex-auto">
        <AllProducts />
      </div>
    </div>
  );
};

export default page;
