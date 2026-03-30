"use client";
import React from "react";
import Logo from "@/../public/images/logo.png";
import mobileLogo from "@/../public/images/logo-mobile.png";
import Image from "next/image";
import { Input } from "../ui/input";
import { Menu, Search, ShoppingCart, UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CreditCardIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { useMounted } from "@/hooks/useMounted";
import Link from "next/link";
import CartOrderSummary from "../Checkout/CartOrderSummary";

const Header = () => {
  const mounted = useMounted();
  const cartItem = useSelector((state: any) => state.cart.items);

  // console.log("Cart Item", cartItem);

  const cartCount = mounted ? cartItem?.length || 0 : 0;
  return (
    <div className="w-full h-fit flex flex-row gap-4 md:justify-between items-center py-2 lg:py-4">
      <div>
        <Link href={"/"}>
          <Image
            className="hidden md:block"
            src={Logo}
            height={100}
            width={100}
            alt="Logo"
          />
          <Image
            className="md:hidden block"
            src={mobileLogo}
            height={50}
            width={50}
            alt="Logo"
          />
        </Link>
      </div>
      <InputGroup className="max-w-sm rounded-2xl">
        <InputGroupInput placeholder="Search in products..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
      <div>
        <div className="hidden md:flex justify-center items-center md:gap-4">
          <UserRound strokeWidth={1.5} />
          <div className="relative">
            <Drawer direction="right">
              <DrawerTrigger asChild>
                <div>
                  <ShoppingCart strokeWidth={1.5} />
                  <span className="absolute -top-2 left-4 rounded-full bg-sky-500 p-0.5 px-2 text-sm text-sky-50">
                    {cartCount}
                  </span>
                </div>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle className="flex flex-row justify-between pb-2">
                    <span className="scroll-m-20 text-xl font-semibold tracking-tight">
                      Cart
                    </span>
                    <ShoppingCart strokeWidth={1.5} />
                  </DrawerTitle>
                </DrawerHeader>
                <div className="no-scrollbar overflow-y-auto px-4">
                  <CartOrderSummary />
                </div>
                <DrawerFooter>
                  <Link href={"/checkout"}>
                    <Button className="w-full">Checkout</Button>
                  </Link>
                  {/* <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose> */}
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size={"sm"}>
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <UserRound strokeWidth={1.5} />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ShoppingCart strokeWidth={1.5} />
                Cart
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <LogOutIcon />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Header;
