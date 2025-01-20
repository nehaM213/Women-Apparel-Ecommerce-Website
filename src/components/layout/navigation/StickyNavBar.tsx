import { Logo } from "@/components/common/Logo";
import { productData } from "@/lib/static-data/Products";
import React from "react";
import { HiOutlineSearch, HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi";
import Sticky from "react-stickynode";
import { v4 as uuidv4 } from "uuid";
import { NavItems } from "./NavItems";
import { SearchBar } from "@/components/common/SearchBar";
import Link from "next/link";
import { moreDropdownItems } from "@/lib/static-data/Navbar";

export const StickyNavBar: React.FC<{
  isSearchOpen: boolean;
  isSticky: boolean;
  toggleSearch: React.Dispatch<React.SetStateAction<boolean>>;
  toggleDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSticky: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isSearchOpen, toggleSearch, toggleDrawer, toggleSticky, isSticky }) => (
  <Sticky
  enabled={true}
  top={0}
  innerZ={10}
  onStateChange={({ status }) =>
    toggleSticky(status === Sticky.STATUS_FIXED)
  }
  className="hidden lg:block"
>
  <div className={`flex justify-between items-center bg-white z-10 shadow-lg px-10 py-4`}>
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
      {moreDropdownItems.map((item:any)=>(
        <NavItems key={uuidv4()} title={item.label} subItems={item.subItems} type="nav" />
      ))}
    </div>
    <div className="flex justify-center md:items-center items-start pt-1 gap-3">
          <HiOutlineSearch
            className="w-8 h-8 cursor-pointer"
            strokeWidth={1.0}
            onClick={() => toggleSearch(!isSearchOpen)}
          />
          <HiOutlineUser className="w-8 h-8 cursor-pointer" strokeWidth={1.0} />
          <HiOutlineShoppingBag
            className="w-8 h-8 cursor-pointer"
            strokeWidth={1.0}
          />
          
        </div>
  </div>
</Sticky>
  );