"use client";
import React from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { Drawer } from "@/components/ui/drawer";
import { NavDrawerContent } from "./NavDrawerContent";
import { MobileNav } from "./MobileNav";
import { StickyNavBar } from "./StickyNavBar";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

const CartDrawer = dynamic(() => import("@/components/cart/CartDrawer"), {
  ssr: false,
});

const NavigationBar: React.FC = () => {
  const [isSticky, setIsSticky] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  // ✅ Only client-side logic for OAuth / checkout
  const { status } = useSession();

  React.useEffect(() => {
    if (status !== "authenticated") return;
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("checkout_after_oauth") === "1"
    ) {
      setIsCartOpen(true);
      localStorage.removeItem("checkout_after_oauth");
    }
  }, [status]);

  const toggleMenu = React.useCallback((category: string) => {
    setOpenMenu((current) => (current === category ? null : category));
  }, []);

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
      <MobileNav
        isSearchOpen={isSearchOpen}
        toggleSearch={setIsSearchOpen}
        toggleDrawer={setIsDrawerOpen}
        drawerOpen={isDrawerOpen}
        toggleCart={setIsCartOpen}
      />
      <StickyNavBar
        isSearchOpen={isSearchOpen}
        toggleSearch={setIsSearchOpen}
        toggleSticky={setIsSticky}
      />
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction="left">
        <NavDrawerContent
          setIsDrawerOpen={setIsDrawerOpen}
          toggleMenu={toggleMenu}
          openMenu={openMenu}
        />
      </Drawer>
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
    </div>
  );
};

export default NavigationBar;
