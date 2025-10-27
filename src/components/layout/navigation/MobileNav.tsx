import React, { useEffect, useState } from "react";
import { Logo } from "@/components/common/Logo";
import { SearchBar } from "@/components/common/SearchBar";
import { HiOutlineMenu, HiOutlineSearch, HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi";
import Sticky from "react-stickynode";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { selectCartTotalQuantity } from "@/store/cartSlice";

// Define component props clearly
export type MobileNavProps = {
  isSearchOpen: boolean;
  toggleSearch: React.Dispatch<React.SetStateAction<boolean>>;
  toggleDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  toggleCart: React.Dispatch<React.SetStateAction<boolean>>;
  drawerOpen?: boolean;
};

export const MobileNav: React.FC<MobileNavProps> = ({
  isSearchOpen,
  toggleSearch,
  toggleDrawer,
  toggleCart,
  drawerOpen,
}) => {
  const cartCount = useSelector(selectCartTotalQuantity);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Sticky enabled top={0} innerZ={10} className="lg:hidden">
      <div className="flex justify-between lg:pr-10 pr-4 pl-4 pt-2 lg:pl-0 bg-white shadow-lg">
        <div className="flex justify-center items-start md:items-center">
          <button
            type="button"
            aria-label="Open navigation menu"
            aria-controls="sidebar-menu"
            aria-expanded={!!drawerOpen}
            onClick={() => toggleDrawer(true)}
            className="p-1"
          >
            <HiOutlineMenu className="w-10 h-10 cursor-pointer lg:hidden" strokeWidth={1.0} />
          </button>
        </div>
        <Logo width={400} height={200} imageClass="w-40 sm:w-48 lg:w-56" />
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Toggle search"
            aria-controls="mobile-search"
            aria-expanded={isSearchOpen}
            onClick={() => toggleSearch(!isSearchOpen)}
            className="p-1"
          >
            <HiOutlineSearch className="w-8 h-8 cursor-pointer" strokeWidth={1.0} />
          </button>
          <button type="button" aria-label="User account" className="p-1">
            <HiOutlineUser className="w-8 h-8 cursor-pointer" strokeWidth={1.0} />
          </button>
          <button
            type="button"
            aria-label="Open cart"
            aria-controls="cart-drawer"
            aria-expanded="false"
            onClick={() => toggleCart(true)}
            className="p-1 relative"
          >
            <HiOutlineShoppingBag className="w-8 h-8 cursor-pointer" strokeWidth={1.0} />
            {isMounted && cartCount > 0 && (
              <span
                className="absolute top-1 -right-0.5 bg-red-500 text-white text-xs rounded-full px-1 leading-none py-[2px]"
                aria-live="polite"
                aria-atomic="true"
                id="cart-count-badge"
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
        {isSearchOpen && <SearchBar toggleSearch={toggleSearch} />}
      </div>
    </Sticky>
  );
};