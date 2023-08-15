"use client";

import Link from "next/link";
import { useState } from "react";
import Close from "@public/icons/close.svg";
import Menu from "@public/icons/menu.svg";
import Icon from "@components/Icon";
import SearchBar from "./SearchBar";
import { RootState } from "@app/GlobalRedux/store";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import Modal from "@mui/material/Modal";
import { motion } from "framer-motion";
import LoginPage from "@components/LoginPage";
import {
  setUserStatus,
  setUserId,
} from "@app/GlobalRedux/Features/Users/userSlice";
import { useDispatch } from "react-redux";

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [navbar, setNavbar] = useState(false);
  const [searchbar, setSearchbar] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const id = useSelector((state: RootState) => state.user.id);
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("idToken");
    dispatch(setUserStatus(false));
    dispatch(setUserId(null));
    window.location.href = process.env.NEXT_PUBLIC_COGNITO_LOGOUT_URL || "";
  };
  const onSearch = () => {
    setSearchbar(!searchbar);
    setNavbar(false);
    console.log(searchbar);
  };

  const onNavbar = () => {
    setNavbar(!navbar);
    setSearchbar(false);
    console.log(searchbar);
  };

  const dropIn = {
    hidden: {
      y: "100vh",
      opacity: 0,
    },
    visible: {
      y: "10vh",
      opacity: 1,
      transition: {
        duration: 1,
        type: "spring",
        damping: 90,
        stiffness: 500,
      },
    },
    exit: {
      y: "-100vh",
      opacity: 0,
    },
  };

  return (
    <nav className='text-white fill-white flex fixed z-50 w-full h-[60px] bg-purple-600 justify-center items-center drop-shadow-2xl '>
      <div className='w-full px-4 h-5/6'>
        <div className=' h-full  flex items-center justify-between flex-shrink-0'>
          <div className=' h-5/6 flex items-center mr-3 text-white font-bold'>
            <Link href='/'>
              <h2 className='flex-grow text-4xl'>Website</h2>
            </Link>
          </div>

          <div className='hidden sm:flex items-center h-5/6 w-6/12 max-w-lg '>
            <SearchBar />
          </div>

          <div className='md:hidden flex justify-center items-center'>
            <button
              className='hover:bg-purple-500 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border'
              onClick={() => onNavbar()}
            >
              {navbar ? <Icon Svg={Close} /> : <Icon Svg={Menu} />}
            </button>
          </div>
          <div className='hidden md:block '>
            <ul className='items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0'>
              <div>
                <Link href='/browse'>
                  <li className='text-white hover:text-violet-400 cursor-pointer'>
                    Browse
                  </li>
                </Link>
              </div>
              <div>
                <Link href='/host'>
                  <li className='text-white hover:text-violet-400 cursor-pointer'>
                    Host
                  </li>
                </Link>
              </div>
              <div className=''>
                <button
                  className='text-white hover:text-violet-400'
                  onClick={handleOpen}
                >
                  {isLoggedIn ? <div>{id}</div> : <div>Login</div>}
                </button>
                {isLoggedIn ? (
                  <button
                    className='text-white hover:text-violet-400'
                    onClick={logout}
                  >
                    logout
                  </button>
                ) : null}
                <AnimatePresence initial={false} mode='wait'>
                  {open && (
                    <Modal open={open} onClose={handleClose}>
                      <motion.div
                        variants={dropIn}
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        className='wrapper rounded-lg bg-gray-700 w-full h-full sm:w-3/4 sm:h-3/4 md:max-w-md m-auto flex flex-col'
                      >
                        <div className='modal-header  text-white fill-white flex justify-center items-center p-4 border-b-[1.5px] border-b-gray-200'>
                          <button
                            className='flex-none bg-purple-500 hover:bg-purple-800  rounded-md outline-none focus:border-gray-400 focus:border'
                            onClick={handleClose}
                          >
                            <Icon Svg={Close} />
                          </button>
                          <h1 className='flex-grow text-center font-bold'>
                            {" "}
                            Login
                          </h1>
                        </div>
                        <div className='modal-body  flex-1 h-full overflow-y-auto'>
                          <LoginPage></LoginPage>
                        </div>
                      </motion.div>
                    </Modal>
                  )}
                </AnimatePresence>
              </div>
            </ul>
          </div>
        </div>
      </div>

      {navbar && (
        <div className='fixed md:hidden top-[60px] right-0 w-[100px]'>
          <ul className='text-xs items-center justify-center md:flex md:space-x-6 md:space-y-0 font-semibold'>
            <div className='flex justify-center items-center bg-purple-500 p-2 text-lg hover:bg-purple-500 cursor-pointer border-y border-black '>
              <Link href='/browse'>
                <li className='text-white hover:text-violet-400 '>Browse</li>
              </Link>
            </div>
            <div className='flex justify-center items-center bg-purple-500 p-2 text-lg hover:bg-purple-500 cursor-pointer border-b border-black'>
              <Link href='/host'>
                <li className='text-white hover:text-violet-400 '>Host</li>
              </Link>
            </div>
            <div className='text-white flex justify-center items-center bg-purple-500 p-2 text-lg hover:bg-purple-500 cursor-pointer border-b border-black '>
              <button onClick={handleOpen}>Login</button>
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
}
