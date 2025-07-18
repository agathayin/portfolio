"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav
      className={`absolute top-0 left-0 z-50 w-full flex justify-between items-center p-4 md:justify-start ${
        isOpen ? "bg-white" : "bg-transparent"
      }`}
    >
      <div id="hamburger" onClick={() => setIsOpen(!isOpen)} className={`${isOpen ? "hidden" : "block"} md:hidden`}>
        <Image src="/room-homepage/images/icon-hamburger.svg" alt="hamburger icon" height={13} width={20} />
      </div>
      <div id="logo" className={`w-full flex justify-center ${isOpen ? "hidden" : "block"} md:w-auto`}>
        <Image src="/room-homepage/images/logo.svg" alt="logo" height={13} width={62} />
      </div>
      <div id="closeIcon" className={!isOpen ? "hidden" : "block"}>
        <Image
          src="/room-homepage/images/icon-close.svg"
          alt="close menu icon"
          height={16}
          width={16}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      <div id="navLinks" className={`flex mx-3 ${isOpen ? "block" : "hidden"} md:block md:text-white`}>
        <ul className="flex flex-row gap-4 cursor-pointer">
          <li>
            <a
              href="#"
              className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-white after:transform after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-3/5"
            >
              home
            </a>
          </li>

          <li>
            <a
              href="#"
              className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-white after:transform after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-3/5"
            >
              shop
            </a>
          </li>
          <li>
            <a
              href="#"
              className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-white after:transform after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-3/5"
            >
              about
            </a>
          </li>
          <li>
            <a
              href="#"
              className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-white after:transform after:-translate-x-1/2 after:transition-all after:duration-300 hover:after:w-3/5"
            >
              contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default function RoomHomepage() {
  useEffect(() => {
    // This effect can be used for any client-side logic if needed
  }, []);
  const data = [
    {
      title: "Discover innovative ways to decorate",
      image: "/room-homepage/images/desktop-image-hero-1.jpg",
      mobileImg: "/room-homepage/images/mobile-image-hero-1.jpg",
      text: `We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love.`,
    },
    {
      title: "We are available all across the globe",
      image: "/room-homepage/images/desktop-image-hero-2.jpg",
      mobileImg: "/room-homepage/images/mobile-image-hero-2.jpg",
      text: `With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, we’re in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don't hesitate to contact us today.`,
    },
    {
      title: "Manufactured with the best materials",
      image: "/room-homepage/images/desktop-image-hero-3.jpg",
      mobileImg: "/room-homepage/images/mobile-image-hero-3.jpg",
      text: `Our modern furniture store provide a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office.`,
    },
  ];
  const [curIndex, setCurIndex] = useState(0);
  const changeContent = (direction: number = 1) => {
    setCurIndex((prevIndex) => {
      const newIndex = prevIndex + direction;
      if (newIndex < 0) return data.length - 1;
      if (newIndex >= data.length) return 0;
      return newIndex;
    });
  };

  return (
    <div id="roomHomepage">
      <Navbar />

      <div id="heroSection" className="flex flex-col w-full md:flex-row">
        <div id="heroImg" className="relative w-full h-[360px]  md:w-2/3 md:h-[500px]">
          <Image
            src={data[curIndex].image}
            alt="Hero Image"
            fill={true}
            className="object-cover hidden md:block transition-opacity duration-500 ease-in-out"
            priority={true}
            key={"d" + curIndex}
          />
          <Image
            src={data[curIndex].mobileImg}
            alt="Hero Image mobile"
            fill={true}
            className="object-cover md:hidden"
            key={"m-" + curIndex}
          />
          <div id="imgSwitches" className="absolute right-0 bottom-0 flex justify-between md:right-[-92px]">
            <button className="px-4 py-2 cursor-pointer bg-black hover:bg-gray-700" onClick={() => changeContent(-1)}>
              <Image src="room-homepage/images/icon-angle-left.svg" alt="Previous" width={14} height={14} />
            </button>
            <button className="px-4 py-2 cursor-pointer bg-black hover:bg-gray-700" onClick={() => changeContent(1)}>
              <Image src="room-homepage/images/icon-angle-right.svg" alt="Next" width={14} height={14} />
            </button>
          </div>
        </div>
        <div className="p-4 md:p-12 md:w-1/3">
          <div className="font-bold text-2xl">{data[curIndex].title}</div>
          <div className="text-sm text-gray-500 my-4">{data[curIndex].text}</div>
          <div>
            <button className="tracking-widest font-bold uppercase text-gray-400">
              SHOP NOW{" "}
              <Image
                src="room-homepage/images/icon-arrow.svg"
                width={20}
                height={12}
                alt="arrow icon"
                className="inline-block ms-2 mb-1"
              />
            </button>
          </div>
        </div>
      </div>

      <div id="aboutSection" className="flex flex-col w-full md:flex-row">
        <Image
          src="/room-homepage/images/image-about-dark.jpg"
          alt="About Image Dark"
          width={420}
          height={266}
          className="w-full md:max-w-[33.33%] h-auto object-cover"
        />
        <div className="px-4 py-8 w-full md:w-1/3 md:min-w-[33.333333%]">
          <div className="text-xl font-bold">About our furniture</div>
          <div className="text-sm text-gray-500 mt-4">
            Our multifunctional collection blends design and function to suit your individual taste. Make each room
            unique, or pick a cohesive theme that best express your interests and what inspires you. Find the furniture
            pieces you need, from traditional to contemporary styles or anything in between. Product specialists are
            available to help you create your dream space.
          </div>
        </div>
        <Image
          src="/room-homepage/images/image-about-light.jpg"
          alt="About Image Light"
          width={420}
          height={266}
          className="w-full md:max-w-[33.3333%] h-auto object-cover"
        />
      </div>
    </div>
  );
}
