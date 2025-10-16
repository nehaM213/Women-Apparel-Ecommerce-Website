"use client";
import React from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { Drawer } from "@/components/ui/drawer";
import { NavDrawerContent } from "./NavDrawerContent";
import { MobileNav } from "./MobileNav";
import { StickyNavBar } from "./StickyNavBar";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

interface NavigationBarProps {}

const CartDrawer = dynamic(() => import("@/components/cart/CartDrawer"), {
  ssr: false,
});

const NavigationBar: React.FC<NavigationBarProps> = () => {
  const [isSticky, setIsSticky] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const { status } = useSession();

  // Listen for OAuth completion and open cart drawer
  React.useEffect(() => {
    if (status !== "authenticated") return;
    try {
      if (
        typeof window !== "undefined" &&
        localStorage.getItem("checkout_after_oauth") === "1"
      ) {
        setIsCartOpen(true);
        localStorage.removeItem("checkout_after_oauth");
      }
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("checkout_after_oauth flag handling failed", e);
      }
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
      {/* sticky Nav bar for desktop */}
      <StickyNavBar
        isSearchOpen={isSearchOpen}
        toggleSearch={setIsSearchOpen}
        toggleDrawer={setIsDrawerOpen}
        isSticky={isSticky}
        toggleSticky={setIsSticky}
      />
      {/* Drawer navigation menu for smaller screens */}
      <Drawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        direction="left"
      >
        <NavDrawerContent
          setIsDrawerOpen={setIsDrawerOpen}
          toggleMenu={toggleMenu}
          openMenu={openMenu}
        />
      </Drawer>
      {/* Cart Drawer for all viewports */}
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
    </div>
  );
};

export default NavigationBar;
