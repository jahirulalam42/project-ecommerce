import Categories from "@/components/Shop/Categories";
import React from "react";

const page = () => {
  return (
    <div className="grid grid-cols-4 gap-6 py-6">
      <div className="col-span-1">
        <Categories />
      </div>
      <div className="col-span-3">AllProducts</div>
    </div>
  );
};

export default page;
