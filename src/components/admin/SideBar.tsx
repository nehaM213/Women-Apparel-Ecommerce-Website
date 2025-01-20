"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from "next/navigation";

const menuItems=[
    {
        name: 'Products',
        link: '/admin'
    },
    {
        name: 'Orders',
        link: '/admin/orders'
    },
    {
        name: 'Users',
        link: '/admin/users'
    }
]
const SideBar = () => {
      const pathname = usePathname();
        const isPathActive = (path: string) => pathname.includes(path);
  return (
    <div>
        <div className="bg-gray-800 text-white p-4">
            <Link href={"/"} >
            <h1 className="text-2xl font-semibold">Lazuli Admin</h1>
            </Link>
        </div>
        <div className="">
            <ul>
                {menuItems.map((item, index) => (
                    <li key={index} className={`p-2 border-b-2 hover:bg-black hover:text-white ${
                        isPathActive(item.link)
                          && "border-black border-2"
                      }`}>
                        <Link href={item.link}>
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default SideBar