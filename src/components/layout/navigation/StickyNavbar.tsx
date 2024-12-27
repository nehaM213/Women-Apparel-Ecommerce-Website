import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { NavItems } from "@/components/layout/navigation/NavItems";
import { v4 as uuidv4 } from "uuid";

interface StickyNavbarProps {
  menuItems: {
    id: number;
    title: string;
    link?: string;
    subItems?: {
      id: number;
      title: string;
      link: string;
    }[];
  }[];
}

const StickyNavbar: React.FC<StickyNavbarProps> = ({ menuItems }) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`flex justify-between m-auto sticky top-0 bg-white z-10 p-4 shadow-lg pb-10 px-10 transition-transform duration-300 ${
      isSticky ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <Input
        type="text"
        iconName="CiSearch"
        className="w-96 border-gray-200"
      />
      <div className="flex">
        {menuItems.map((item) =>
          item.link ? (
            <Link
              key={uuidv4()}
              className="flex flex-col flex-wrap items-center text-center no-underline align-center"
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
        )}
      </div>
    </div>
  );
};

export default StickyNavbar;