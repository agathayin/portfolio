"use client";
import { useState } from "react";
import Image from "next/image";
import imageHeroDesktop from "./images/image-hero-desktop.png";
import imageHeroMobile from "./images/image-hero-mobile.png";
import clientAudiophille from "./images/client-audiophile.svg";
import clientDatabiz from "./images/client-databiz.svg";
import clientMaker from "./images/client-maker.svg";
import clientMeet from "./images/client-meet.svg";
import logo from "./images/logo.svg";
import iconMenu from "./images/icon-menu.svg";
import iconCloseMenu from "./images/icon-close-menu.svg";
import iconArrowDown from "./images/icon-arrow-down.svg";
import iconArrowUp from "./images/icon-arrow-up.svg";
import iconCalendar from "./images/icon-calendar.svg";
import iconPlanning from "./images/icon-planning.svg";
import iconReminders from "./images/icon-reminders.svg";
import iconTodo from "./images/icon-todo.svg";

function DropdownMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showCompany, setShowCompany] = useState(false);

  return (
    <div id="menu" className="flex justify-between p-3 align-middle">
      <Image src={logo} alt="logo" height={27} className="m-0 md:my-8" style={{ maxHeight: 27 }} />
      <Image
        src={iconMenu}
        alt="hamburgerMenu"
        onClick={() => setShowMenu(!showMenu)}
        className="cursor-pointer md:hidden"
      />
      <div
        id="menuContent"
        className={`${
          showMenu ? "block" : "hidden"
        } fixed inset-y-0 right-0 left-0 bg-black bg-opacity-50 md:flex md:relative md:shrink md:w-11/12`}
      >
        <div
          className={`fixed inset-y-0 right-0 left-1/3 bg-white p-5 md:relative md:flex md:left-0 md:align-middle md:w-full`}
        >
          <div className="block md:flex md:justify-between md:w-full">
            <div className="block md:flex">
              <div className="flex justify-end cursor-pointer md:hidden">
                <Image src={iconCloseMenu} alt="close" onClick={() => setShowMenu(!showMenu)} />
              </div>
              <div onClick={() => setShowFeatures(!showFeatures)} className="cursor-pointer my-3 mx-3">
                Features{" "}
                <Image src={showFeatures ? iconArrowUp : iconArrowDown} alt="arrow down" className="inline-block" />
              </div>
              <div
                className={`${
                  showFeatures ? "block" : "hidden"
                } cursor-pointer px-3 md:absolute md:-left-14 md:top-20  md:bg-white md:shadow-2xl md:rounded`}
              >
                <div className="flex m-3">
                  <Image src={iconTodo} alt="todo" width={20} height={20} className="me-3" /> Todo List
                </div>
                <div className="flex m-3">
                  <Image src={iconCalendar} alt="calendar" width={20} height={20} className="me-3" /> Calendar
                </div>
                <div className="flex m-3">
                  <Image src={iconReminders} alt="reminder" width={20} height={20} className="me-3" /> Reminders
                </div>
                <div className="flex m-3">
                  <Image src={iconPlanning} alt="planning" width={20} height={20} className="me-3" /> Planning
                </div>
              </div>
              <div onClick={() => setShowCompany(!showCompany)} className="cursor-pointer my-3 mx-3">
                Company{" "}
                <Image src={showCompany ? iconArrowUp : iconArrowDown} alt="arrow down" className="inline-block" />
              </div>
              <div
                className={`${
                  showCompany ? "block" : "hidden"
                } cursor-pointer px-3 md:absolute md:left-32 md:top-20  md:bg-white md:shadow-2xl md:rounded`}
              >
                <div className="m-3">History</div>
                <div className="m-3">Our Team</div>
                <div className="m-3">Blog</div>
              </div>
              <div className="my-3 mx-3">Careers</div>
              <div className="my-3 mx-3 cursor-pointer">About</div>
            </div>
            <div className="block md:flex">
              <div className="my-3 mx-3 text-center cursor-pointer">Login</div>
              <div className="my- p-3 rounded border-black border text-center cursor-pointer">Register</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function IntroSectionWithDropDownNavigation() {
  return (
    <div>
      <DropdownMenu />
      <div className="container mx-auto">
        <div className="flex flex-col gap-3 md:flex-row-reverse">
          <div className="p-0 md:p-3">
            <picture>
              <source media="(min-width: 768px)" srcSet={imageHeroDesktop.src} />
              <source media="(max-width: 767px)" src={imageHeroMobile.src} />
              <img src={imageHeroMobile.src} alt="hero" />
            </picture>
          </div>
          <div className="text-lg text-center md:text-left">
            <div className="text-3xl font-bold mb-5 mt-10 md:text-6xl">
              Make <span className="whitespace-nowrap">remote work</span>
            </div>
            <div>
              Get your team in sync, no matter your location. Streamline processes, create team rituals, and watch
              productivity soar.
            </div>
            <button className="bg-black py-3 px-5 text-white my-5 rounded">Learn more</button>
            <div className="flex gap-3">
              <Image src={clientDatabiz} alt="databiz" height={25} />
              <Image src={clientAudiophille} alt="audiophille" height={25} />
              <Image src={clientMeet} alt="meet" height={25} />
              <Image src={clientMaker} alt="maker" height={25} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
