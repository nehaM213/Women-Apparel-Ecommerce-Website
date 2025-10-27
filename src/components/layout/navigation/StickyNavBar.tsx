import React, { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/common/Logo";
import { productData } from "@/lib/static-data/Products";
import { HiOutlineSearch, HiOutlineShoppingBag } from "react-icons/hi";
import Sticky from "react-stickynode";
import { v4 as uuidv4 } from "uuid";
import { NavItems } from "./NavItems";
import { SearchBar } from "@/components/common/SearchBar";
import Link from "next/link";
import { moreDropdownItems } from "@/lib/static-data/Navbar";
import { useSelector } from "react-redux";
import CartDrawer from "@/components/cart/CartDrawer";
import { selectCartTotalQuantity } from "@/store/cartSlice";

export type StickyNavBarProps = {
  isSearchOpen: boolean;
  toggleSearch: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSticky: React.Dispatch<React.SetStateAction<boolean>>;
};

export const StickyNavBar: React.FC<StickyNavBarProps> = ({
  isSearchOpen,
  toggleSearch,
  toggleSticky,
}) => {
  const cartCount = useSelector(selectCartTotalQuantity);
  const [isMounted, setIsMounted] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const stickyDebounceRef = useRef<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Debounce sticky toggle for performance
  const handleStickyStateChange = ({ status }: { status: number }) => {
    if (stickyDebounceRef.current) {
      window.clearTimeout(stickyDebounceRef.current);
    }
    stickyDebounceRef.current = window.setTimeout(() => {
      toggleSticky(status === Sticky.STATUS_FIXED);
    }, 100);
  };

  return (
    <Sticky
      enabled
      top={0}
      innerZ={10}
      onStateChange={handleStickyStateChange}
      className="hidden lg:block"
    >
      <div className="flex justify-between items-center bg-white z-10 shadow-lg px-10 py-4">
        <Logo width={400} height={200} imageClass="w-40 h-auto sm:w-48 lg:w-50" />
        <div className="hidden md:flex items-center">
          {isSearchOpen && (
            <SearchBar toggleSearch={toggleSearch} />
          )}
          <Link
            className="flex items-center text-center no-underline"
            href="/"
            prefetch
          >
            <NavItems title="HOME" />
          </Link>
          {productData.map((item: any) => (
            <NavItems
              key={uuidv4()}
              title={item.category.toUpperCase()}
              subItems={item.collections}
              type="product"
            />
          ))}
          {moreDropdownItems.map((item: any) => (
            <NavItems key={uuidv4()} title={item.label} subItems={item.subItems} type="nav" />
          ))}
        </div>
        <div className="flex justify-center md:items-center items-start pt-1 gap-3">
          <button
            type="button"
            aria-label="Toggle search"
            aria-controls="navbar-search"
            aria-expanded={isSearchOpen}
            onClick={() => toggleSearch(!isSearchOpen)}
            className="p-1"
          >
            <HiOutlineSearch className="w-8 h-8 cursor-pointer" strokeWidth={1.0} />
          </button>
          <NavItems type="user" subItems={[]} />
          <button
            type="button"
            className="relative"
            onClick={() => setIsCartOpen(true)}
            aria-label="Open cart"
            aria-controls="cart-drawer"
            aria-expanded={isCartOpen}
          >
            <HiOutlineShoppingBag className="w-8 h-8 cursor-pointer" strokeWidth={1.0} />
            {isMounted && cartCount > 0 && (
              <span
                className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1 transform translate-x-1 -translate-y-1"
                aria-live="polite"
                aria-atomic="true"
                id="cart-count-badge"
              >
                {cartCount}
              </span>
            )}
          </button>
          <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
        </div>
      </div>
    </Sticky>
  );
};