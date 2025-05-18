import SideBar from "@/components/admin/SideBar";
import { EdgeStoreProvider } from "@/lib/edgestore";
import type { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title:
    "LazuliByNeha - Sarees, ready to wear sarees, dupatta, shawls, suits and more",
  description:
    "LazuliByNeha - Sarees, ready to wear sarees, dupatta, shawls, suits and more",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <EdgeStoreProvider>
      <div className="flex flex-col lg:flex-row h-screen">
        <div className="w-full overflow-auto border-r-2 lg:w-1/5 bg-gray md:bg-none border-border h-full">
          <SideBar />
        </div>
        <div className="flex flex-col w-full">{children}</div>
      </div>
    </EdgeStoreProvider>
  );
}
