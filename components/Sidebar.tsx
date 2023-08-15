"use client";

import React from "react";
import Link from "next/link";
import SidebarItem from "@components/SidebarItem";
import Icon from "@components/Icon";
import Home from "@public/icons/home.svg";
import Following from "@public/icons/following.svg";
import Trending from "@public/icons/trend.svg";
import Login from "@public/icons/login.svg";
import { useAppSelector } from "@app/GlobalRedux/hooks";
import { usePathname } from "next/navigation";

function Sidebar() {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const path = usePathname();

  return (
    <aside
      className='h-[calc(100vh-60px)] fixed flex flex-col flex-none w-[60px] top-[60px] left-0 lg:w-[200px] overflow-hidden hover:overflow-y-auto overscroll-y-contain px-1.5 py-5 bg-gray-800'
      aria-label='sidebar'
    >
      <ul className='text-xl space-y-1'>
        <SidebarItem name={"FYP"} path={"/"} target='_self'>
          <div className={path === "/" ? "fill-green-400" : "fill-white"}>
            <Icon Svg={Home} />
          </div>
        </SidebarItem>
        <SidebarItem name={"Trending"} path={"/trending"}>
          <div
            className={path === "/trending" ? "fill-green-400" : "fill-white"}
          >
            <Icon Svg={Trending} />
          </div>
        </SidebarItem>
        <SidebarItem name={"Following"} path={"/following"}>
          <div
            className={path === "/following" ? "fill-green-400" : "fill-white"}
          >
            <Icon Svg={Following} />
          </div>
        </SidebarItem>
      </ul>
      <hr className='my-4 mx-2' />
      <ul className='text-xl space-y-1'>
        <SidebarItem name={"Temp"} path={"/"}>
          <div
            className={path === "/following" ? "fill-green-400" : "fill-white"}
          >
            <Icon Svg={Following} />
          </div>
        </SidebarItem>
        <SidebarItem name={"Temp"} path={"/"}>
          <div
            className={path === "/following" ? "fill-green-400" : "fill-white"}
          >
            <Icon Svg={Following} />
          </div>
        </SidebarItem>
        <SidebarItem name={"Temp"} path={"/"}>
          <div
            className={path === "/following" ? "fill-green-400" : "fill-white"}
          >
            <Icon Svg={Following} />
          </div>
        </SidebarItem>
        <SidebarItem name={"Temp"} path={"/"}>
          <div
            className={path === "/following" ? "fill-green-400" : "fill-white"}
          >
            <Icon Svg={Following} />
          </div>
        </SidebarItem>
      </ul>
      <hr className='my-4 mx-2' />
      <div className='text-xs hidden lg:block mt-auto'>
        <div className='flex space-x-1'>
          <Link href={"/About"} className='text-white hover:underline'>
            About
          </Link>
          <Link href={"/Contact"} className='text-white hover:underline'>
            Contact
          </Link>
        </div>
        <p className='mt-3 text-white'>© 2023 Website</p>
      </div>
    </aside>
  );
}

export default Sidebar;
