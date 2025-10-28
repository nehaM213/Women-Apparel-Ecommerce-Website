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
import { signOut, useSession } from "next-auth/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import LoginRegister from "@/components/auth/LoginRegister";
import { usePathname } from "next/navigation";

export function NavItems({title,subItems,type}:{title?:string,subItems?:any[],type?:string}) {
  const { data: session, status } = useSession();
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const pathname = usePathname();
  
  return (
    <>
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
                      {session?.user ? 
                        (
                          <>
                      <p className="text-lg tracking-menu leading-menu font-500">Welcome</p>
                      <ListItem
                      title="Profile"
                      href="/user/profile" 
                    />
                      <ListItem
                      title="Logout"
                      onClick={() => signOut({ callbackUrl: pathname  })}
                    />
                    </>
                    ) :
                      (
                        <li>
                          <button
                            onClick={() => setIsLoginOpen(true)}
                            className="block select-none space-y-1 rounded-md leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-menu tracking-menu leading-menu font-500">Login/Signup</div>
                          </button>
                        </li>
                      ) }
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

      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login or Sign up</DialogTitle>
            <DialogDescription>Login to your account</DialogDescription>
          </DialogHeader>
          <LoginRegister />
        </DialogContent>
      </Dialog>
    </>
  )
}

interface ListItemProps {
  title: string;
  children?: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const ListItem = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ListItemProps
>(({ className, title, children, href, onClick, ...props }, ref) => {
  if (onClick) {
    return (
      <li>
        <button
          onClick={onClick}
          className={cn(
            "block select-none space-y-1 rounded-md leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground w-full text-left",
            className
          )}
          {...props}
        >
          <div className="text-menu tracking-menu leading-menu font-500">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </button>
      </li>
    );
  }

  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href || ""}
          ref={ref as React.Ref<HTMLAnchorElement>}
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
  );
});
ListItem.displayName = "ListItem";
