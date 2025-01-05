import { productData } from "@/lib/static-data/Products";
import { Link } from "lucide-react";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export const NavigationLinks: React.FC = () => (
    <nav>
      {productData.map((item) => (
        <Link key={uuidv4()} href={`/${item.category}`} className="mr-4">
          {item.category.toUpperCase()}
        </Link>
      ))}
      <Link href="/aboutus" className="mr-4">
        ABOUT US
      </Link>
    </nav>
  );