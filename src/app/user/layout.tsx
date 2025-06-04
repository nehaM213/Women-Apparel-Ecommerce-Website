'use client'
import SideBar from "@/components/admin/SideBar";
import type { Metadata } from "next";
import React from "react";
import { signOut, useSession } from 'next-auth/react';

const menuItems=[
    {
        name: 'Profile',
        link: '/user'
    },
    {
        name: 'Delivery Address',
        link: '/user/address'
    },
    {
        name: 'Order History',
        link: '/user/order-history'
    },
    {
        name: 'Change Password',
        link: '/user/change-password'
    },
    {
        name: 'Logout',
        link: '/user/logout',
        action: () => signOut({ callbackUrl: '/' })
    }
  ]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  return (
      <div className="flex flex-col lg:flex-row h-screen px-12 py-8 md:px-15 sm:py-8 xl:m-0">
        <div className="w-full overflow-auto lg:w-1/5 bg-gray md:bg-none border-border h-full">
          <SideBar menuItems={menuItems} heading={`Hello! ${session?.user?.name || ''}`} />
        </div>
        <div className="flex flex-col w-full ml-10">{children}</div>
      </div>
  );
}
