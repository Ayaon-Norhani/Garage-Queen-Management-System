"use client";

import { cn } from "@/src/lib/utils";
import { Ampersand } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ComponentProps } from "react";

type Props = {
  children: React.ReactNode;
};

export const Nav = ({ children }: Props) => {
  return (
    <nav className="bg-navBg text-primary-foreground flex justify-between items-center px-9 py-5">
      <h1 className="text-2xl flex font-bold">
        Cars <Ampersand color="#defff2" /> Bids
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
        "px-4 py-3 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground rounded",
        pathname === props.href && "bg-background text-foreground"
      )}
    />
  );
};

export default Nav;
