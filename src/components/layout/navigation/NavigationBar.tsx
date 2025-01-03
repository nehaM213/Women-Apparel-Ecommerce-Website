"use client";
import React from "react";
import { NavItems } from "@/components/layout/navigation/NavItems";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  HiOutlineShoppingBag,
  HiOutlineUser,
  HiOutlineMenu,
  HiOutlineChevronRight,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineSearch,
  HiOutlineX,
} from "react-icons/hi";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import Sticky from "react-stickynode";
import { productData } from "@/lib/static-data/Products";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerClose,
} from "@/components/ui/drawer";

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

        <Link
          className="flex flex-col flex-wrap items-center justify-center text-center no-underline"
          href="/"
          prefetch
        >
          <Image
            width={400}
            height={200}
            priority={true}
            className="w-40 sm:w-48 lg:w-56"
            alt="Logo"
            src="/logo.png"
          />
        </Link>
        <div className="flex justify-center md:items-center items-start pt-1 gap-3">
          <HiOutlineUser className="w-8 h-8 cursor-pointer" strokeWidth={1.0} />
          <HiOutlineShoppingBag
            className="w-8 h-8 cursor-pointer"
            strokeWidth={1.0}
          />
        </div>
      </div>
      <Sticky enabled={true} top={0} innerZ={10} className="lg:hidden">
        <div className="flex justify-between lg:pr-10 pr-4 pl-4 pt-2 lg:pl-0 bg-white">
          <div className="flex justify-center items-start md:items-center">
            <HiOutlineMenu
              className="w-10 h-10 cursor-pointer lg:hidden"
              onClick={() => setIsDrawerOpen(true)}
              strokeWidth={1.0}
            />
          </div>

          <Link
            className="flex flex-col flex-wrap items-center justify-center text-center no-underline"
            href="/"
            prefetch
          >
            <Image
              width={400}
              height={200}
              priority={true}
              className="w-40 sm:w-48 lg:w-56"
              alt="Logo"
              src="/logo.png"
            />
          </Link>
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
          <div className="absolute top-0 left-0 w-full bg-white p-4 shadow-md">
            <div className="flex justify-between items-center">
              <input
                type="text"
                placeholder="Search"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <HiOutlineX
                className="w-6 h-6 cursor-pointer ml-2"
                onClick={() => setIsSearchOpen(false)}
              />
            </div>
            <div className="mt-2">
              <span className="block text-sm font-semibold">Popular searches</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {["Shoes", "Winter", "Coats", "Women", "Kids"].map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-gray-200 rounded-full cursor-pointer"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
        </div>
      </Sticky>
      <Sticky
        enabled={true}
        top={0}
        innerZ={10}
        onStateChange={({ status }) =>
          setIsSticky(status === Sticky.STATUS_FIXED)
        }
        className="hidden lg:block"
      >
        <div className="flex justify-between items-center bg-white z-10 shadow-lg px-10 py-4">
          {isSticky && (
            <Link className="flex items-center no-underline w-96" href="/" prefetch>
              <Image
                width={500}
                height={200}
                priority={true}
                className="w-96 sm:w-48"
                alt="Logo"
                src="/logo.png"
              />
            </Link>
          )}
          <div className="w-full">
          <Input type="text" iconName="CiSearch" className="flex-grow" />
          </div>
          <div className="hidden md:flex">
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

      <Drawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        direction="left"
      >
        <DrawerContent>
          <div className="flex justify-between items-center py-4 pr-4">
            <Image
              width={100}
              height={100}
              alt="Logo"
              src="/logo.png"
              className="w-40"
            />
            <DrawerClose className="text-xl cursor-pointer">✕</DrawerClose>
          </div>
          <Link
            className="block text-left no-underline pl-4 py-4 border-b-2"
            href="/"
            prefetch
          >
            HOME
          </Link>
          {productData.map((item: any) => (
            <div key={uuidv4()}>
              <div
                className="flex justify-between items-center cursor-pointer p-4"
                onClick={() => toggleMenu(item.category)}
              >
                <span>{item.category.toUpperCase()}</span>
                <span>
                  {openMenu === item.category ? "−" : <HiOutlineChevronRight />}
                </span>
              </div>
              {openMenu === item.category && (
                <div className="pl-4">
                  {item.collections.map((subItem: any) => (
                    <Link
                      key={uuidv4()}
                      href={`/desired-path/${subItem.slug}`}
                      className="block p-2 no-underline"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      {subItem.heading}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            className="block text-left no-underline pl-4 py-4 border-b-2"
            href="/aboutus"
            prefetch
            onClick={() => setIsDrawerOpen(false)}
          >
            ABOUT US
          </Link>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default NavigationBar;
