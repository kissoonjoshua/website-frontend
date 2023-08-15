"use client";

import React, { useState } from "react";
import { Modal } from "@mui/material";
import Close from "@public/icons/close.svg";
import Icon from "@components/Icon";

export default function Filters() {
  const [filterOpen, setFilterOpen] = useState(false);
  return (
    <div className='flex-none'>
      <button
        className='border rounded-lg px-3 py-2 hover:bg-purple-500 duration-200'
        onClick={() => setFilterOpen(true)}
      >
        Filters
      </button>
      <Modal
        className='text-white fill-white flex items-center'
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
      >
        <div className='bg-gray-700 h-5/6 w-5/6 m-auto flex flex-col'>
          <div className='flex-none flex items-center p-4'>
            <button
              className='absolute rounded-full hover:bg-gray-600 p-3'
              onClick={() => setFilterOpen(false)}
            >
              <Icon Svg={Close} width={20} height={20} />
            </button>
            <p className='font-bold text-center w-full'>Filters</p>
          </div>
          <div className='flex-1 min-h-0 overflow-y-auto border-y-2 px-6 py-8'>
            <div>testtssets</div>
            <div>testtssets</div>
            <div>testtssets</div>
            <div>testtssets</div>
            <div>testtssets</div>
            <div>testtssets</div>
            <div>testtssets</div>
            <div>testtssets</div>
            <div>testtssets</div>
          </div>
          <div className='flex-none flex items-center justify-between px-4 py-6'>
            <p className='py-3 px-4 font-bold self-center hover:bg-gray-600 rounded-lg underline'>
              Clear
            </p>
            <button className='py-3 px-4 font-bold text-black text-center rounded-lg bg-green-300 hover:bg-green-500'>
              Apply
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
