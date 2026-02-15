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
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className="w-full h-fit flex flex-row gap-4 md:justify-between items-center py-2 lg:py-4">
      <div>
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
          <ShoppingCart strokeWidth={1.5} />
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
