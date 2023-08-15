import React from "react";
import Icon from "@components/Icon";
import Link from "next/link";

interface BrowseCategoryProps {
  Svg: any;
  category: string;
}

export default function BrowseCategory({ Svg, category }: BrowseCategoryProps) {
  return (
    <Link
      className='fill-white flex flex-col items-center gap-2 duration-200 group hover:text-purple-500 hover:fill-purple-500'
      href={`/browse/${category}`}
    >
      <Icon Svg={Svg} />
      <p className='text-sm font-semibold'>{category}</p>
      <hr className='mx-0 h-px border w-full border-gray-800 group-hover:border-purple-500 duration-200 ' />
    </Link>
  );
}
