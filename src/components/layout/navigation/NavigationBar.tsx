"use client";
import React from "react";
import { NavItems } from "@/components/layout/navigation/NavItems";
import {
  HiOutlineShoppingBag,
  HiOutlineUser,
  HiOutlineMenu,
  HiOutlineChevronRight,
  HiOutlineSearch,
} from "react-icons/hi";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import Sticky from "react-stickynode";
import { productData } from "@/lib/static-data/Products";
import {
  Drawer,
} from "@/components/ui/drawer";
import { Logo } from "@/components/common/Logo";
import { SearchBar } from "@/components/common/SearchBar";
import { NavDrawerContent } from "./NavDrawerContent";
import { MobileNav } from "./MobileNav";
import { StickyNavBar } from "./StickyNavBar";

interface NavigationBarProps {}

const NavigationBar: React.FC<NavigationBarProps> = () => {
  const [isSticky, setIsSticky] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  const toggleMenu = (category: string) => {
    setOpenMenu(openMenu === category ? null : category);
  };

  return (
    <div className="w-full md:mt-10 mt-5">
      <div className="lg:flex justify-between lg:pr-10 pr-4 pl-4 lg:pl-0 hidden">
        <div className="flex justify-center items-start md:items-center">
          <HiOutlineMenu
            className="w-10 h-10 cursor-pointer lg:hidden"
            onClick={() => setIsDrawerOpen(true)}
            strokeWidth={1.0}
          />
        </div>
        <Logo width={400} height={200} imageClass="w-40 sm:w-48 lg:w-56" />
        <div className="flex justify-center md:items-center items-start pt-1 gap-3">
          <HiOutlineSearch
            className="w-8 h-8 cursor-pointer"
            strokeWidth={1.0}
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          />
          <HiOutlineUser className="w-8 h-8 cursor-pointer" strokeWidth={1.0} />
          <HiOutlineShoppingBag
            className="w-8 h-8 cursor-pointer"
            strokeWidth={1.0}
          />
        </div>
        {isSearchOpen && (
            <SearchBar toggleSearch={setIsSearchOpen} />
        )}
      </div>
      <MobileNav isSearchOpen={isSearchOpen} toggleSearch={setIsSearchOpen} toggleDrawer={setIsDrawerOpen} />
      {/* sticky Nav bar for desktop */}
      <StickyNavBar isSearchOpen={isSearchOpen} toggleSearch={setIsSearchOpen} toggleDrawer={setIsDrawerOpen} isSticky={isSticky} toggleSticky={setIsSticky}  />
      {/* Drawer navigation menu for smaller screens */}
      <Drawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        direction="left"
      >
        <NavDrawerContent setIsDrawerOpen={setIsDrawerOpen} toggleMenu={toggleMenu} openMenu={openMenu} />
      </Drawer>
    </div>
  );
};

export default NavigationBar;
