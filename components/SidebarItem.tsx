import React from "react";
import Link from "next/link";

function SidebarItem({
  name,
  path,
  target,
  children,
}: {
  name: string;
  path: string;
  target?: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={path}
        className='flex transition duration-100 justify-center lg:justify-start p-2 rounded-lg hover:bg-purple-500'
        target={target}
      >
        {children}
        <p className='ml-3 text-white text-lg/6 font-semibold hidden lg:flex'>
          {name}
        </p>
      </Link>
    </li>
  );
}

export default SidebarItem;
