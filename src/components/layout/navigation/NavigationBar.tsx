"use client";
import React from "react";
import {
  HiOutlineMenu,
} from "react-icons/hi";
import {
  Drawer,
} from "@/components/ui/drawer";
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
