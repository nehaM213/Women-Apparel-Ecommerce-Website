import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Logo } from "@/components/common/Logo";
import { DrawerClose, DrawerContent } from "@/components/ui/drawer";
import { productData } from "@/lib/static-data/Products";
import Link from "next/link";
import { HiOutlineChevronRight } from "react-icons/hi";

export type NavDrawerContentProps = {
  setIsDrawerOpen: (isOpen: boolean) => void;
  toggleMenu: (category: string) => void;
  openMenu: string | null;
};

export const NavDrawerContent: React.FC<NavDrawerContentProps> = ({
  setIsDrawerOpen,
  toggleMenu,
  openMenu,
}) => (
  <DrawerContent role="navigation" aria-label="Site main navigation">
    <div className="flex justify-between items-center py-4 pr-4">
      <Logo width={100} height={100} imageClass="w-40" />
      {/* DrawerClose uses a span, but is semantically a button. Usage is correct. */}
      <DrawerClose className="text-xl cursor-pointer" aria-label="Close navigation sidebar">
        ✕
      </DrawerClose>
    </div>
    <Link
      className="block text-left no-underline pl-4 py-4 border-b-2"
      href="/"
      prefetch
      onClick={() => setIsDrawerOpen(false)}
      role="menuitem"
    >
      HOME
    </Link>
    {productData.map((item: any) => (
      <div key={uuidv4()}>
        <div
          className="flex justify-between items-center cursor-pointer p-4 border-b-2"
          onClick={() => toggleMenu(item.category)}
          aria-expanded={openMenu === item.category}
          aria-controls={`submenu-${item.category}`}
          role="button"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === "Enter" || e.key === " ") toggleMenu(item.category);
          }}
        >
          <span>{item.category.toUpperCase()}</span>
          <span>{openMenu === item.category ? "−" : <HiOutlineChevronRight />}</span>
        </div>
        {openMenu === item.category && (
          <div className="pl-4" id={`submenu-${item.category}`} role="menu">
            {item.collections.map((subItem: any) => (
              <Link
                key={uuidv4()}
                href={`/${subItem.type}/collection/${subItem.collectionType}`}
                className="block p-2 no-underline"
                onClick={() => setIsDrawerOpen(false)}
                role="menuitem"
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
      role="menuitem"
    >
      ABOUT US
    </Link>
  </DrawerContent>
);    