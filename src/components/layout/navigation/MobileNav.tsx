import { Logo } from "@/components/common/Logo";
import { SearchBar } from "@/components/common/SearchBar";
import { HiOutlineMenu, HiOutlineSearch, HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi";
import React from "react";
import Sticky from "react-stickynode";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export const MobileNav: React.FC<{
    isSearchOpen: boolean;
    toggleSearch: React.Dispatch<React.SetStateAction<boolean>>;
    toggleDrawer: React.Dispatch<React.SetStateAction<boolean>>;
    toggleCart: React.Dispatch<React.SetStateAction<boolean>>;
    drawerOpen?: boolean;
  }> = ({ isSearchOpen, toggleSearch, toggleDrawer, toggleCart, drawerOpen }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => { setIsMounted(true); }, []);

  return (
  <Sticky enabled={true} top={0} innerZ={10} className="lg:hidden">
    <div className="flex justify-between lg:pr-10 pr-4 pl-4 pt-2 lg:pl-0 bg-white shadow-lg">
      <div className="flex justify-center items-start md:items-center">
        <button aria-label="Open navigation menu" aria-expanded={!!drawerOpen} onClick={() => toggleDrawer(true)} className="p-1">
          <HiOutlineMenu
            className="w-10 h-10 cursor-pointer lg:hidden"
            strokeWidth={1.0}
          />
        </button>
      </div>
      <Logo width={400} height={200} imageClass="w-40 sm:w-48 lg:w-56" />
      <div className="flex items-center gap-3">
        <button aria-label="Toggle search" aria-expanded={isSearchOpen} onClick={() => toggleSearch(!isSearchOpen)} className="p-1">
          <HiOutlineSearch
            className="w-8 h-8 cursor-pointer"
            strokeWidth={1.0}
          />
        </button>
        <button aria-label="User account" className="p-1">
          <HiOutlineUser
            className="w-8 h-8 cursor-pointer"
            strokeWidth={1.0}
          />
        </button>
        <button aria-label="Open cart" aria-expanded={false} onClick={() => toggleCart(true)} className="p-1 relative">
          <HiOutlineShoppingBag
            className="w-8 h-8 cursor-pointer"
            strokeWidth={1.0}
          />
          {isMounted && cartCount > 0 && (
            <span className="absolute top-1 -right-0.5 bg-red-500 text-white text-xs rounded-full px-1 leading-none py-[2px]">
              {cartCount}
            </span>
          )}
        </button>
      </div>
      {isSearchOpen && (
        <SearchBar toggleSearch={toggleSearch} />
    )}
    </div>
  </Sticky>
  );
}