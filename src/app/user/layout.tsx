"use server"
import SideBar from "@/components/admin/SideBar";
import React from "react";
import { signOut, useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

const menuItems=[
    {
        name: 'Profile',
        link: '/user/profile'
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
        action: "logout"
    }
  ]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }
  return (
      <div className="flex flex-col lg:flex-row h-screen px-12 py-8 md:px-15 sm:py-8 xl:m-0">
        <div className="w-full overflow-auto lg:w-1/5 bg-gray md:bg-none border-border h-full">
          <SideBar menuItems={menuItems} heading={`Hello! ${session?.user?.name || ''}`} />
        </div>
        <div className="flex flex-col w-full ml-10">{children}</div>
      </div>
  );
}
