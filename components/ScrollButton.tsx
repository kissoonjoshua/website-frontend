"use client";

import { ArrowUpward } from "@mui/icons-material";
import React, { useEffect, useState } from "react";

const ScrollButton = () => {
  const [scrollPos, setScrollPos] = useState(0);

  const handleScroll = () => {
    setScrollPos(window.scrollY);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className='z-30 fixed bottom-[-50px] right-[40px] ease-out duration-300 drop-shadow-lg bg-purple-500 rounded-full p-2'
      onClick={scrollToTop}
      style={{
        transform: scrollPos > 0 ? "translateY(-80px)" : "translateY(0px)",
      }}
    >
      <ArrowUpward className='invert' />
    </button>
  );
};

export default ScrollButton;
