"use client";
import React from "react";
import { NavItems } from "@/components/layout/navigation/NavItems";
import Image from "next/image";
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
  DrawerContent,
  DrawerClose,
} from "@/components/ui/drawer";
import { Logo } from "@/components/common/Logo";
import { SearchBar } from "@/components/common/SearchBar";
import { NavDrawerContent } from "./NavDrawerContent";

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
      <Sticky enabled={true} top={0} innerZ={10} className="lg:hidden">
        <div className="flex justify-between lg:pr-10 pr-4 pl-4 pt-2 lg:pl-0 bg-white shadow-lg">
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
            <HiOutlineUser
              className="w-8 h-8 cursor-pointer"
              strokeWidth={1.0}
            />
            <HiOutlineShoppingBag
              className="w-8 h-8 cursor-pointer"
              strokeWidth={1.0}
            />
          </div>
          {isSearchOpen && (
            <SearchBar toggleSearch={setIsSearchOpen} />
        )}
        </div>
      </Sticky>
      {/* Larger screen sticky nav bar */}
      <Sticky
        enabled={true}
        top={0}
        innerZ={10}
        onStateChange={({ status }) =>
          setIsSticky(status === Sticky.STATUS_FIXED)
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
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              /> )}
              {isSearchOpen && (
                <SearchBar toggleSearch={setIsSearchOpen} />
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
              />
            ))}
            <Link
              className="flex items-center text-center no-underline"
              href="/aboutus"
              prefetch
            >
              <NavItems title="ABOUT US" />
            </Link>
          </div>
        </div>
      </Sticky>
      {/* Drawer menu for smaller screens */}
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
