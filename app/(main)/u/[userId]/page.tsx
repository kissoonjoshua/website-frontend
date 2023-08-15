"use client";

import React from "react";
import Link from "next/link";
import Icon from "@components/Icon";
import Following from "@public/icons/following.svg";

export default function User({
  params: { userId },
}: {
  params: { userId: string };
}) {
  return (
    <div className='fill-white m-auto w-11/12 overflow-y-auto space-y-5 text-white'>
      <div className='flex'>
        <Link
          className='border-2 border-red-500 rounded-full overflow-hidden'
          href={`/${userId}`}
        >
          <Icon height={100} width={100} Svg={Following} />
        </Link>
        <div className='ml-6 flex flex-col'>
          <Link className='font-bold text-2xl/6' href={`/u/${userId}`}>
            {userId}
          </Link>
          <Link className='font-semibold text-lg/8' href={`/u/${userId}`}>
            Name
          </Link>
          <button className='mt-auto h-[40px] w-[200px] rounded-md border-2 border-green-500 text-green-500 transition duration-100 hover:bg-green-100 font-semibold'>
            Follow
          </button>
        </div>
      </div>
      <div>
        <span className='font-bold'>73</span>
        <span className='ml-2'>Following</span>
        <span className='font-bold ml-4'>10.4K</span>
        <span className='ml-2'>Followers</span>
        <span className='font-bold ml-4'>7M</span>
        <span className='ml-2'>Likes</span>
        <p>Description</p>
        <Link
          className='font-bold text-green-500'
          href={"https://www.example.com"}
        >
          example.com
        </Link>
      </div>
      <div>
        <p>Events</p>
      </div>
    </div>
  );
}
