"use client";
import React, { useEffect, useRef, useState } from "react";
import Logo from "@/../public/images/logo.png";
import mobileLogo from "@/../public/images/logo-mobile.png";
import Image from "next/image";
import { Input } from "../ui/input";
import { Menu, Search, ShoppingCart, UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
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
import { useDispatch, useSelector } from "react-redux";
import { useMounted } from "@/hooks/useMounted";
import Link from "next/link";
import CartOrderSummary from "../Checkout/CartOrderSummary";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { removeAllCartItem } from "@/features/cart/cartSlice";
import { searchProducts } from "@/lib/api";

const Header = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const pathname = usePathname();
  const mounted = useMounted();
  const cartItem = useSelector((state: any) => state.cart.items);
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // console.log("Cart Item", cartItem);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    debounceTimer.current = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const res = await searchProducts(searchQuery.trim());
        console.log("Search results", res);
        setSuggestions(res?.data?.data || []);
        setShowDropdown(true);
      } catch (error) {
        console.error("Search error:", error);
        setSuggestions([]);
        setShowDropdown(false);
      } finally {
        setSearchLoading(false);
      }
    }, 100);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (productId: string) => {
    setShowDropdown(false);
    setSearchQuery("");
    // Navigate to the product detail page – adjust path as needed
    router.push(`/product/${productId}`); // or wherever your product page is
  };

  const cartCount = mounted ? cartItem?.length || 0 : 0;

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
    dispatch(removeAllCartItem());
  };

  console.log("Search Query", searchQuery);

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
      {pathname !== "/checkout" &&
        pathname !== "/login" &&
        pathname !== "/register" && (
          <div
            className="hidden md:flex w-full max-w-sm relative"
            ref={searchRef}
          >
            <InputGroup>
              <InputGroupInput
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (suggestions.length > 0) setShowDropdown(true);
                }}
              />
              <InputGroupAddon>
                <Search strokeWidth={1.5} />
              </InputGroupAddon>
            </InputGroup>

            {/* Dropdown suggestions */}
            {showDropdown && suggestions.length > 0 && (
              <div className="absolute top-full mt-1 left-0 w-full bg-white border rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
                {suggestions.map((product: any) => (
                  <div
                    key={product._id}
                    onClick={() => handleSuggestionClick(product._id)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
                  >
                    {/* Optional: product thumbnail */}
                    {product.images?.[0] && (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-8 h-8 object-cover rounded"
                      />
                    )}
                    <span className="text-sm font-medium">{product.name}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Optional: loading indicator */}
            {searchLoading && (
              <div className="absolute top-full mt-1 left-0 w-full bg-white border rounded-md shadow-lg z-50 p-3 text-center text-sm text-gray-500">
                Searching...
              </div>
            )}

            {/* No results (when query exists but no matches) */}
            {!searchLoading &&
              showDropdown &&
              searchQuery.trim().length >= 2 &&
              suggestions.length === 0 && (
                <div className="absolute top-full mt-1 left-0 w-full bg-white border rounded-md shadow-lg z-50 p-3 text-center text-sm text-gray-500">
                  No products found.
                </div>
              )}
          </div>
        )}
      <div>
        <div className="hidden md:flex justify-center items-center md:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <UserRound strokeWidth={1.5} />
            </DropdownMenuTrigger>
            {session === null ? (
              <DropdownMenuContent>
                <Link href={"/login"}>
                  {" "}
                  <DropdownMenuItem>
                    Log In
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            ) : (
              <DropdownMenuContent>
                {/* <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem>
                    Profile
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Billing
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Settings
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator /> */}
                <Link href={"/my-orders"}>
                  {" "}
                  <DropdownMenuItem>My Orders</DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            )}
          </DropdownMenu>
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
                {cartCount > 0 && session && (
                  <DrawerFooter>
                    <Link href={"/checkout"}>
                      <Button className="w-full">Checkout</Button>
                    </Link>
                  </DrawerFooter>
                )}
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
