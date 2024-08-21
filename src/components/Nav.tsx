"use client";

import { cn } from "@/src/lib/utils";
import { Crown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ComponentProps } from "react";

type Props = {
  children: React.ReactNode;
};

export const Nav = ({ children }: Props) => {
  return (
    <nav className="bg-navBg text-primary-foreground flex justify-between items-center px-9 py-5">
      <h1 className="text-2xl flex font-bold space-x-2">
        <Image
          src="https://res.cloudinary.com/dyyqzhpji/image/upload/v1724221579/gq_logo_ht3yzj.jpg"
          width={35}
          height={35}
          alt="GarageQueen Logo"
        />
        <div className="flex">
          Garage
          <span className="text-[#3bb3c3] flex relative">
            Queen
            <span className="absolute -top-[7px] -right-[16px] rotate-45">
              <Crown />
            </span>
          </span>
        </div>
      </h1>

      <div className="space-x-3">{children}</div>
    </nav>
  );
};

export const NavLinks = (
  props: Omit<ComponentProps<typeof Link>, "className">
) => {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "px-4 py-3 hover:bg-[#3bb3c3]  hover:text-white focus-visible:bg-secondary focus-visible:text-secondary-foreground rounded",
        pathname === props.href &&
          "bg-background bg-[#3bb3c3] text-foreground text-white font-bold"
      )}
    />
  );
};

export default Nav;
