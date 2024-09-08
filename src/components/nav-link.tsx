"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="w-full fixed flex items-center gap-4 p-3">
      <Link className={`link ${pathname === "/" ? "active" : ""}`} href="/">
        Home
      </Link>
    </nav>
  );
}
