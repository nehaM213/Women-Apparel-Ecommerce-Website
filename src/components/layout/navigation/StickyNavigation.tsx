import { Logo } from "@/components/common/Logo";
import { productData } from "@/lib/static-data/Products";
import { Link } from "lucide-react";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export const StickyNavigation: React.FC<{ isSticky: boolean }> = ({ isSticky }) => (
    <div className="bg-white shadow-md p-4">
      {isSticky && <Logo />}
      <nav>
        {productData.map((item) => (
          <Link key={uuidv4()} href={`/${item.category}`} className="mr-4">
            {item.category.toUpperCase()}
          </Link>
        ))}
      </nav>
    </div>
  );