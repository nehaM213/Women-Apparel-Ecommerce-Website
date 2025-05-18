"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from "@/components/ui/navigation-menu"
import Link from "next/link";
import { v4 as uuidv4 } from 'uuid';
import { HiOutlineUser } from "react-icons/hi";

export function NavItems({title,subItems,type}:{title?:string,subItems?:any[],type?:string}) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          {type !== "user" ? 
          (<NavigationMenuTrigger className="text-lg tracking-menu leading-menu font-light space-y-1 p-3 hover:underline" subItem={subItems ? true : false}>{title}</NavigationMenuTrigger>) : (<NavigationMenuTrigger className="text-lg tracking-menu leading-menu font-light space-y-1 p-3">
            <HiOutlineUser className="w-8 h-8 cursor-pointer" strokeWidth={1.0} />
          </NavigationMenuTrigger> )}
          {subItems && 
          <NavigationMenuContent>
            <div className="text-sm">
              <ul className="p-3 text-nowrap">
                <div>
                  {type === "product" && subItems?.map((subItem:any) => (
                    <ListItem
                      key={uuidv4()}
                      title={subItem.collectionType.toUpperCase()}
                      href={`/${subItem.type}/collection/${subItem.collectionType}`}
                    >
                      {/* {subItem.description} */}
                    </ListItem>
                  ))}
                  {type === "nav" && subItems?.map((subItem:any) => (
                    <ListItem
                      key={uuidv4()}
                      title={subItem.label}
                      href={subItem.link}
                    >
                      {/* {subItem.description} */}
                    </ListItem>
                  ))}
                  {type === "user" && (
                    <>
                      <ListItem
                      title="Login/Signup"
                      href="/login"
                    />
                    <ListItem
                      title="Orders"
                      href="/"
                    />
                    <ListItem
                      title="Track Order"
                      href="/"
                    />
                    </>
                  )
                  }
                </div>
              </ul>
            </div>
          </NavigationMenuContent>}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href|| ""}
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md leading-none no-underline outline-none transition-colors",
            className
          )}
          {...props}
          prefetch
        >
          <div className="text-menu tracking-menu leading-menu font-500">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
