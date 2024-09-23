"use client";
import { useState, useEffect } from "react";
import "./style.scss";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Menu from "./components/Menu";
import Image from "next/image";
import heroImgDesktop from "./assets/images/image-web-3-desktop.jpg";
import heroImgMobile from "./assets/images/image-web-3-mobile.jpg";
import imageRetroPcs from "./assets/images/image-retro-pcs.jpg";
import imageTopLaptops from "./assets/images/image-top-laptops.jpg";
import imageGamingGrowth from "./assets/images/image-gaming-growth.jpg";

export default function NewsHomepage() {
  return (
    <div id="newsHomepage">
      <div id="newsHomepageContainer" className={`container mx-auto p-3 ${inter.className}`}>
        <Menu />
        <div className="container mt-3 flex flex-col md:flex-row gap-2">
          <div className="flex flex-wrap">
            <div className="block w-full">
              <Image
                src={heroImgDesktop}
                alt="hero image"
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                className="desktop w-full"
              />
              <Image
                src={heroImgMobile}
                alt="hero image"
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                className="mobile"
              />
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="heading-l md:heading-xl font-bold"> The Bright Future of Web 3.0?</div>
              <div className="mt-4">
                <p>
                  The Bright Future of Web 3.0? We dive into the next evolution of the web that claims to put the power
                  of the platforms back into the hands of the people. But is it really fulfilling its promise?
                </p>
                <button className="readMoreBtn">Read more</button>
              </div>
            </div>
          </div>
          <div className="bg-very-dark-blue p-3">
            <div className="heading-m md:heading-l text-soft-orange">New</div>
            <div className="heading-s font-bold text-[#FFFDFA] mb-2 hover:text-[#E9AA52]">
              New Hydrogen VS Electric Cars
            </div>
            <div className="text-[#C5C6CE] text-n ">
              Will hydrogen-fueled cars ever catch up to EVs? The Downsides of AI Artistry What are the possible adverse
              effects of on-demand AI image generation?
            </div>
            <hr className="my-3" />
            <div className="heading-s font-bold text-[#FFFDFA] mb-2 hover:text-[#E9AA52]">
              The Downsides of AI Artistry
            </div>
            <div className="text-[#C5C6CE] text-n ">
              What are the possible adverse effects of on-demand AI image generation?
            </div>
            <hr className="my-3" />
            <div className="heading-s font-bold text-[#FFFDFA] mb-2 hover:text-[#E9AA52]">Is VC Funding Drying Up?</div>
            <div className="text-[#C5C6CE] text-n ">
              Private funding by VC firms is down 50% YOY. We take a look at what that means.
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3 my-10">
          <div className="flex gap-3">
            <Image src={imageTopLaptops} width={100} height={127} alt="title 2" />
            <div>
              <div className="text-[#F15D51] font-bold heading-m">01</div>
              <div className="font-bold text-[#00001A] hover:text-[#F15D51]">Reviving Retro PCs</div>
              <div className="text-[#5E607A]">What happens when old PCs are given modern upgrades?</div>
            </div>
          </div>
          <div className="flex gap-3">
            <Image src={imageGamingGrowth} width={100} height={127} alt="title 3" />
            <div>
              <div className="text-[#F15D51] font-bold heading-m">02</div>
              <div className="font-bold text-[#00001A] hover:text-[#F15D51]">Top 10 Laptops of 2022</div>
              <div className="text-[#5E607A]">Our best picks for various needs and budgets.</div>
            </div>
          </div>
          <div className="flex gap-3">
            <Image src={imageRetroPcs} width={100} height={127} alt="title 3" />
            <div>
              <div className="text-[#F15D51] font-bold heading-m">03</div>
              <div className="font-bold text-[#00001A] hover:text-[#F15D51]">The Growth of Gaming</div>
              <div className="text-[#5E607A]">How the pandemic has sparked fresh opportunities.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
