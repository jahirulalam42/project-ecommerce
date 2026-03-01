"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { ListFilter } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedCategory,
  removeSelectedCategory,
  setItemsPerPage,
} from "@/features/shop/categorySlice";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { getCategories } from "@/lib/api";
import { Checkbox } from "../ui/checkbox";

const MobileCategories = () => {
  const [categories, setCategories] = useState<any>();

  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state: any) => state.category.selectedCategory
  );

  const handleSelect = (e: any) => {
    dispatch(setItemsPerPage(e.target.value));
  };

  useEffect(() => {
    const fetchData = async () => {
      const categoriesResult: any = await getCategories();
      setCategories(categoriesResult?.data);
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-row justify-between">
      <div>
        {" "}
        <Dialog>
          <DialogTrigger asChild>
            <Button size={"sm"} variant="outline" className="rounded-2xl">
              <ListFilter strokeWidth={1.5} /> Filters
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Filters</DialogTitle>
            </DialogHeader>
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
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        {" "}
        <NativeSelect size="sm" onChange={handleSelect} className="rounded-2xl">
          <NativeSelectOption value="">Rows per page</NativeSelectOption>
          <NativeSelectOption value={5}>5</NativeSelectOption>
          <NativeSelectOption value={10}>10</NativeSelectOption>
          <NativeSelectOption value={15}>15</NativeSelectOption>
          <NativeSelectOption value={20}>20</NativeSelectOption>
        </NativeSelect>
      </div>
    </div>
  );
};

export default MobileCategories;
