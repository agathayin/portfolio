"use client";
import { useState } from "react";
import Image from "next/image";
import LogoImg from "../assets/images/logo.svg";
import MenuImg from "../assets/images/icon-menu.svg";
import MenuCloseImg from "../assets/images/icon-menu-close.svg";
export default function Menu() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  return (
    <div className="flex justify-between align-center bg-[#FAFCFF]">
      <Image src={LogoImg} width={64} height={40} alt="logo" />
      <div className="block md:hidden py-3" onClick={() => setShowMobileMenu(!showMobileMenu)}>
        <Image
          src={MenuImg}
          width={40}
          height={17}
          alt="hamburger menu"
          className={`${!showMobileMenu ? "block" : "hidden"} mobile`}
        />
      </div>
      <div className={`menuList ${showMobileMenu ? "block" : "hidden"}`}>
        <ul className="justify-end">
          <div className="w-full flex justify-end md:hidden">
            <Image
              src={MenuCloseImg}
              width={30}
              height={30}
              alt="menu close"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="mobile"
            />
          </div>
          <li>Home</li>
          <li>New</li>
          <li>Popular</li>
          <li>Trending</li>
          <li>Categories</li>
        </ul>
      </div>
    </div>
  );
}
