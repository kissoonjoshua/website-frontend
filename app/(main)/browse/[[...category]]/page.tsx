"use client";

import React, { useEffect, useState, useRef } from "react";
import BrowseCategory from "@components/BrowseCategory";
import BrowseItem from "@components/BrowseItem";
import Home from "@public/icons/home.svg";
import { useAppSelector } from "@app/GlobalRedux/hooks";
import { selectEventIds } from "@app/GlobalRedux/Features/Events/eventSlice";
import FilterModal from "@components/FilterModal";
import Icon from "@components/Icon";
import Arrow from "@public/icons/arrow.svg";
import { motion, AnimatePresence } from "framer-motion";
import EventModal from "@components/EventModal";
import ReactPlayer from "react-player";

const categories = [
  "outside",
  "scary",
  "party",
  "fun",
  "horror",
  "fadsf",
  "fdaf",
  "fewfwf",
  "fefe",
  "feiij",
  "ghghoi",
  "1fadsf",
  "2fdaf",
  "3fewfwf",
  "4fefe",
  "5feiij",
  "6ghghoi",
];

export default function Browse({
  params: { category },
}: {
  params: { category: string };
}) {
  const eventIds: string[] = useAppSelector(selectEventIds);
  const scroll = useRef<HTMLDivElement>(null);
  const [catScrollPos, setCatScrollPos] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [scrollMax, setScrollMax] = useState(0);
  const videoRefs = useRef<Record<string, ReactPlayer | null>>({});
  const addVideoRef = (elem: ReactPlayer | null, videoId: string) => {
    videoRefs.current[videoId] = elem;
  };

  const handleScroll = () => {
    const pos = scroll.current!.scrollLeft;
    setCatScrollPos(pos);
  };

  const callback: ResizeObserverCallback = (entries) => {
    for (const entry of entries) {
      if (entry.contentBoxSize) {
        setScrollWidth(entry.contentBoxSize[0].inlineSize);
        if (scroll.current) {
          const max = scroll.current.scrollWidth - scroll.current.clientWidth;
          setScrollMax(max);
        }
      }
    }
  };

  useEffect(() => {
    scroll.current?.addEventListener("scroll", handleScroll);
    const observer = new ResizeObserver(callback).observe(scroll.current!);
    console.log(category);

    return () => {
      scroll.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const leftHandler = () => {
    const scrollDelta = scrollWidth - scrollWidth * 0.4;
    scroll.current?.scrollBy({
      left: -scrollDelta,
      behavior: "smooth",
    });
  };

  const rightHandler = () => {
    const scrollDelta = scrollWidth - scrollWidth * 0.4;
    scroll.current?.scrollBy({
      left: scrollDelta,
      behavior: "smooth",
    });
  };

  return (
    <div className='m-auto flex flex-col w-11/12 text-white fill-white items-center space-y-3'>
      <EventModal videoRefs={videoRefs} eventIds={eventIds} />
      <div className='z-30 sticky top-[60px] w-full h-full flex gap-10 items-center justify-between pt-5 pb-2 px-2 bg-gray-800'>
        <div className='w-full h-full flex overflow-x-hidden relative'>
          <div
            id='catScroll'
            ref={scroll}
            className='flex gap-10 overflow-x-hidden'
          >
            {categories.map((cat: string) => (
              <BrowseCategory Svg={Home} category={cat} key={`${cat}`} />
            ))}
          </div>
          <div className='pointer-events-none absolute w-full h-full flex justify-between items-center'>
            <AnimatePresence>
              {catScrollPos !== 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className='h-full flex items-center pl-1 pr-5 bg-gradient-to-r from-gray-800 from-65% to-transparent'
                >
                  <button
                    className='mb-2 pointer-events-auto hover:scale-125 duration-200 hover:shadow-lg hover:fill-purple-500'
                    onClick={leftHandler}
                  >
                    <Icon Svg={Arrow} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            <div></div>
            <AnimatePresence>
              {catScrollPos !== scrollMax && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className='h-full flex items-center pr-1 pl-5 bg-gradient-to-l from-gray-800 from-65% to-transparent'
                >
                  <button
                    className='mb-2 pointer-events-auto  rotate-180 hover:scale-125 duration-200 hover:shadow-lg hover:fill-purple-500'
                    onClick={rightHandler}
                  >
                    <Icon Svg={Arrow} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <FilterModal />
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5'>
        {eventIds.map((id: string) => (
          <BrowseItem id={id} key={id} callback={addVideoRef} />
        ))}
      </div>
      <div>loading</div>
    </div>
  );
}
