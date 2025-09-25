import { Logo } from "@/components/common/Logo";
import { SearchBar } from "@/components/common/SearchBar";
import { HiOutlineMenu, HiOutlineSearch, HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi";
import React from "react";
import Sticky from "react-stickynode";

export const MobileNav: React.FC<{
    isSearchOpen: boolean;
    toggleSearch: React.Dispatch<React.SetStateAction<boolean>>;
    toggleDrawer: React.Dispatch<React.SetStateAction<boolean>>;
    toggleCart: React.Dispatch<React.SetStateAction<boolean>>;
  }> = ({ isSearchOpen, toggleSearch, toggleDrawer, toggleCart }) => (
    <Sticky enabled={true} top={0} innerZ={10} className="lg:hidden">
    <div className="flex justify-between lg:pr-10 pr-4 pl-4 pt-2 lg:pl-0 bg-white shadow-lg">
      <div className="flex justify-center items-start md:items-center">
        <HiOutlineMenu
          className="w-10 h-10 cursor-pointer lg:hidden"
          onClick={() => toggleDrawer(true)}
          strokeWidth={1.0}
        />
      </div>
      <Logo width={400} height={200} imageClass="w-40 sm:w-48 lg:w-56" />
      <div className="flex justify-center md:items-center items-start pt-1 gap-3">
        
      <HiOutlineSearch
        className="w-8 h-8 cursor-pointer"
        strokeWidth={1.0}
        onClick={() => toggleSearch(!isSearchOpen)}
      />
        <HiOutlineUser
          className="w-8 h-8 cursor-pointer"
          strokeWidth={1.0}
        />
        <HiOutlineShoppingBag
          className="w-8 h-8 cursor-pointer"
          strokeWidth={1.0}
          onClick={() => toggleCart(true)}
        />
      </div>
      {isSearchOpen && (
        <SearchBar toggleSearch={toggleSearch} />
    )}
    </div>
  </Sticky>
  );