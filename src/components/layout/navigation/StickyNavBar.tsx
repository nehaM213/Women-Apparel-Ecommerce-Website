import { Logo } from "@/components/common/Logo";
import { productData } from "@/lib/static-data/Products";
import React from "react";
import { HiOutlineSearch } from "react-icons/hi";
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
  <div className={`flex ${isSticky ? "justify-between" : "justify-end" } items-center bg-white z-10 shadow-lg px-10 py-4`}>
    {isSticky && (
      <Logo width={150} height={150}/>
    )}
    <div className="hidden md:flex items-center">
      {isSticky && (              
        <HiOutlineSearch
          className="w-6 h-6 cursor-pointer align-top mr-2"
          strokeWidth={1.0}
          onClick={() => toggleSearch(!isSearchOpen)}
        /> )}
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
      {/* <Link
        className="flex items-center text-center no-underline"
        href="/aboutus"
        prefetch
      >
        <NavItems title="ABOUT US" />
      </Link> */}
      {moreDropdownItems.map((item:any)=>(
        <NavItems key={uuidv4()} title={item.label} subItems={item.subItems} type="nav" />
      ))}
    </div>
  </div>
</Sticky>
  );