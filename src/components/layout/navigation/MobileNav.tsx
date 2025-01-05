import { Logo } from "@/components/common/Logo";
import { SearchBar } from "@/components/common/SearchBar";
import { HiOutlineMenu } from "react-icons/hi";
import React from "react";

export const MobileNav: React.FC<{
    isSearchOpen: boolean;
    toggleSearch: React.Dispatch<React.SetStateAction<boolean>>;
    toggleDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  }> = ({ isSearchOpen, toggleSearch, toggleDrawer }) => (
    <div className="flex justify-between items-center p-4 lg:hidden">
      <button onClick={() => toggleDrawer(true)}>
        <HiOutlineMenu className="w-6 h-6" />
      </button>
      <Logo />
      {/* <SearchBar isSearchOpen={isSearchOpen} toggleSearch={toggleSearch} /> */}
    </div>
  );