"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from "next/navigation";

const SideBar = ({menuItems,heading}:{menuItems:any[],heading?:string}) => {
      const pathname = usePathname();
        const isPathActive = (path: string) => pathname.includes(path);
  return (
    <div>
        {heading && (
        <div className="bg-gray-800 text-white p-4">
            <Link href={"/"} >
            <h1 className="text-2xl font-semibold">{heading}</h1>
            </Link>
        </div>
        )}
        <div className="">
            <ul>
                {menuItems.map((item, index) => (
                    <Link href={item.link} key={index}>
                    <li className={`p-2 shadow-lg hover:bg-black hover:text-white ${
                        isPathActive(item.link)
                          && "border-black border-2"
                      }`}>
                        
                            {item.name}
                        
                    </li>
                    </Link>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default SideBar