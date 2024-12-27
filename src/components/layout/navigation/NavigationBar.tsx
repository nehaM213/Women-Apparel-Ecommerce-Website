"use client";
import React from "react";
import { NavItems } from "@/components/layout/navigation/NavItems";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
// import StickyNavbar from "./stickyNavbar";
import Sticky from "react-stickynode";
import { productData } from "@/lib/static-data/Products";


interface NavigationBarProps {}

const menuItems = [
  {
    id: 1,
    title: "HOME",
    link: "/",
  },
  {
    id: 2,
    title: "SAREES",
    subItems: [
      {
        id: 1,
        title: "COTTON",
        link: "/sarees/collection/cotton-saree-collection",
      },
      {
        id: 2,
        title: "SILK",
        link: "/sarees/collection/silk-saree-collection",
      },
      {
        id: 3,
        title: "BANARASI",
        link: "/sarees/collection/banarasi-saree-collection",
      },
    ],
  },
  {
    id: 3,
    title: "SUITS",
    subItems: [
      {
        id: 1,
        title: "COTTON",
        link: "/suits/collection/cotton-suit-collection",
      },
      {
        id: 2,
        title: "SILK",
        link: "/suits/collection/silk-suit-collection",
      },
      {
        id: 3,
        title: "BANARASI",
        link: "/suits/collection/banarasi-suit-collection",
      },
    ],
  },
  {
    id: 1,
    title: "JEWELLERY",
    subItems: [
      {
        id: 1,
        title: "NECKLACES",
        link: "/jewellery/collection/necklaces-collection",
      },
      {
        id: 2,
        title: "EARRINGS",
        link: "/jewellery/collection/earrings-collection",
      },
      {
        id: 3,
        title: "BANGLES",
        link: "/jewellery/collection/bangles-collection",
      },
    ],
  },
  {
    id: 1,
    title: "SHAWLS",
    link: "/shawls",
  },
  {
    id: 1,
    title: "ABOUT US",
    link: "/aboutus",
  },
];

const NavigationBar: React.FC<NavigationBarProps> = () => {
  const [isSticky, setIsSticky] = React.useState(false);
  return (
    <div className="w-full mt-10">
      <div className="flex justify-between pr-10">
        <Link
          className="flex flex-col flex-wrap items-center justify-start text-center no-underline"
          href="/" prefetch
        >
          <Image
            width={400}
            height={200}
            priority={true}
            className="w-56 sm:w-48 lg:w-56"
            alt="Lazuli-by-neha-Sarees-Suits-shawls-ready-to-wear-sarees-dupatta-Logo"
            src="/logo.png"
          />
        </Link>
        <div className="flex justify-center items-center gap-3">
        <HiOutlineUser className="w-8 h-8 cursor-pointer" strokeWidth={1.0}/>
        <HiOutlineShoppingBag className="w-8 h-8 cursor-pointer" strokeWidth={1.0}/>
        </div>
      </div>
      <Sticky
  enabled={true}
  top={0}
  innerZ={10}
  onStateChange={({ status }) => setIsSticky(status === Sticky.STATUS_FIXED)}
>
  <div className="flex justify-between items-center bg-white z-10 shadow-lg px-10 py-4">
    {isSticky && (
      <Link
        className="flex items-center no-underline"
        href="/"
        prefetch
      >
        <Image
          width={400}
          height={200}
          priority={true}
          className="w-40 sm:w-48"
          alt="Logo"
          src="/logo.png"
        />
      </Link>
    )}
    <Input
      type="text"
      iconName="CiSearch"
      className="w-96"
    />
    <div className="flex">
      {/* {menuItems.map((item) =>
        item.link ? (
          <Link
            key={uuidv4()}
            className="flex items-center text-center no-underline"
            href={item.link || ""}
            prefetch
          >
            <NavItems title={item.title} />
          </Link>
        ) : (
          <NavItems
            key={uuidv4()}
            title={item.title}
            subItems={item.subItems || []}
          />
        )
      )} */}
                  <Link
            
              className="flex items-center text-center no-underline"
              href="/"
              prefetch
            >
              <NavItems title="HOME" />
            </Link>
      {
        productData.map((item:any)=>(
            <NavItems
              key={uuidv4()}
              title={item.category.toUpperCase()}
              subItems={item.collections}
            />
        ))
      }
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

        {/* <StickyNavbar menuItems={menuItems}/> */}
    </div>
  );
};

export default NavigationBar;
