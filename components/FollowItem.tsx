import React from "react";
import Image, { StaticImageData } from "next/image";
import Icon from "@components/Icon";
import Link from "next/link";

type FollowItemProps = {
  bg: StaticImageData;
  name: string;
  username: string;
  Svg: any;
};

function FollowItem({ bg, name, username, Svg }: FollowItemProps) {
  return (
    <Link href={`${username}`} target='_blank'>
      <div className='flex flex-none overflow-hidden rounded-lg text-white justify-center w-[200px] h-[300px]'>
        <div className='relative self-center'>
          <Image src={bg} alt={"a"} className='rounded-lg' />
        </div>
        <div className='pb-5 flex flex-col gap-2 self-end items-center absolute'>
          <div className='mb-2 w-[50px] h-[50px] flex justify-center items-center rounded-full border-purple-500 border overflow-hidden'>
            <Icon Svg={Svg} />
          </div>
          <div className='font-bold leading-3'>{name}</div>
          <div className='text-sm font-semibold'>{username}</div>
          <button className='py-2 px-12 rounded-md bg-purple-800 font-bold hover:bg-purple-900'>
            Follow
          </button>
        </div>
      </div>
    </Link>
  );
}

export default FollowItem;
