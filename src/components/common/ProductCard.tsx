import React from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Star } from "lucide-react";
import Link from "next/link";

const ProductCard = ({ item, getCategory }: any) => {
  return (
    <div className="p-1">
      <Card className="relative mx-auto w-full md:w-[309px] h-[448px] rounded-none pt-0">
        <img
          src={item?.images[0]}
          alt="Event cover"
          className="relative z-20 aspect-video w-full object-cover h-[90%]"
        />
        <Link href={`/shop/${item?.id}`}>
          <CardHeader>
            <CardAction className="flex flex-col gap-2">
              <Badge variant="outline" className="ml-2">
                {item?.discountPrice}
              </Badge>
              <Badge variant="secondary" className="ml-2 line-through">
                {item?.price}
              </Badge>
            </CardAction>
            <CardAction></CardAction>
            <CardTitle>{item?.name}</CardTitle>
            <CardDescription>{getCategory(item?.categoryId)}</CardDescription>
            <div className="flex flex-row gap-2">
              <Star
                strokeWidth={1.5}
                className="text-yellow-400 fill-current"
              />{" "}
              {item?.rating} ({item?.reviewCount})
            </div>
          </CardHeader>
        </Link>
      </Card>
    </div>
  );
};

export default ProductCard;
