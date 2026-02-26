"use client";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { getCategories } from "@/lib/api";
import { Label, LabelMd } from "../ui/label";
import { Slider } from "../ui/slider";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Separator } from "../ui/separator";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedCategory,
  removeSelectedCategory,
  setPriceValue,
  setSortValue,
} from "@/features/shop/categorySlice";

const Categories = () => {
  const [categories, setCategories] = useState<any>();
  // const [priceValue, setPriceValue] = useState<number[]>([0.3]);

  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state: any) => state.category.selectedCategory
  );
  const priceValue = useSelector((state: any) => state.category.priceValue);
  const sortValue = useSelector((state: any) => state.category.sortValue);

  const handleSortChange = (value: any) => {
    dispatch(setSortValue(value));
  };

  const handlePriceChange = (value: any) => {
    dispatch(setPriceValue(value));
  };

  useEffect(() => {
    const fetchData = async () => {
      const categoriesResult: any = await getCategories();
      setCategories(categoriesResult?.data);
    };
    fetchData();
  }, []);

  // console.log("Selected Category", selectedCategory);
  // console.log("priceValue", priceValue);
  // console.log("sortValue", sortValue);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <FieldSet>
          <FieldLegend variant="legend">Categories</FieldLegend>
          <FieldGroup className="gap-3">
            {categories?.map((category: any) => {
              const isChecked = selectedCategory?.includes(category?.id);
              return (
                <Field key={category?.id} orientation="horizontal">
                  <Checkbox
                    id="finder-pref-9k2-hard-disks-ljj-checkbox"
                    name={category?.name}
                    checked={isChecked}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        dispatch(addSelectedCategory(category?.id));
                      } else {
                        dispatch(removeSelectedCategory(category?.id));
                      }
                    }}
                  />
                  <FieldLabel
                    htmlFor="finder-pref-9k2-hard-disks-ljj-checkbox"
                    className="font-normal"
                  >
                    {category?.name}
                  </FieldLabel>
                </Field>
              );
            })}
          </FieldGroup>
        </FieldSet>
      </div>
      <Separator />
      <div>
        <div className="mx-auto grid w-full  gap-3">
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor="price-range" className="text-base mb-3">
              Price range
            </Label>
            <span className="text-muted-foreground text-sm">0.3, 0.7</span>
          </div>
          <Slider
            id="price-range"
            value={priceValue}
            onValueChange={handlePriceChange}
            min={0}
            max={1}
            step={0.1}
          />
        </div>
      </div>
      <Separator />
      <div>
        <FieldLegend variant="legend">Sort order</FieldLegend>
        <div>
          <RadioGroup
            onValueChange={handleSortChange}
            defaultValue="mostPopular"
            className="w-fit"
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="mostPopular" id="r1" />
              <LabelMd htmlFor="r1">Most Popular</LabelMd>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="bestRating" id="r2" />
              <LabelMd htmlFor="r2">Best Rating</LabelMd>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="newest" id="r3" />
              <LabelMd htmlFor="r3">Newest</LabelMd>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="priceLow" id="r4" />
              <LabelMd htmlFor="r4">Price Low - High</LabelMd>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="priceHigh" id="r5" />
              <LabelMd htmlFor="r5">Price High</LabelMd>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default Categories;
