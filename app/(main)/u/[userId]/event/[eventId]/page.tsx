"use client";

import React from "react";
import Link from "next/link";

interface EventProps {
  params: { userId: string; eventId: string };
}

export default function Event({ params: { userId, eventId } }: EventProps) {
  return (
    <div className='fill-white m-auto w-11/12 overflow-y-auto space-y-5 text-white'>
      <div className='flex flex-col'>
        <Link className='font-bold text-2xl/6' href={`/u/${userId}`}>
          Event Name
        </Link>
        <div className='mt-2 font-semibold text-sm flex justify-between items-center'>
          <div>
            <p></p>
            <Link className='' href={`/u/${userId}`}>
              {userId}
            </Link>
          </div>
          <div className='flex gap-2'>
            <button className='px-2 py-1 rounded-md border-2 border-green-500 text-green-500 duration-100 hover:bg-green-100'>
              Share
            </button>
            <button className='mt-auto px-2 py-1 rounded-md border-2 border-green-500 text-green-500 duration-100 hover:bg-green-100'>
              Save
            </button>
          </div>
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
