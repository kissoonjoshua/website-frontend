"use client";

import React from "react";
import LoginSelectButton from "@components/LoginSelectButton";
import { Google } from "@mui/icons-material";

const LoginPage = () => {
  function onGoogleClick(): void {
    window.location.href = process.env.NEXT_PUBLIC_COGNITO_URL || "";
  }

  return (
    <div className=' rounded-b-lg flex-col flex-1 items-center justify-center h-full  w-full  p-8 pt-12 text-white fill-white'>
      <div className=' flex-1 h-full overflow-y-auto'>
        <div className='  flex justify-center items-center '>
          <h2 className='text-2xl font-bold   mb-4'>Welcome</h2>
        </div>
        <LoginSelectButton
          method='Google'
          icon={<Google />}
          onclick={onGoogleClick}
        ></LoginSelectButton>
      </div>

      <div className='flex-none'>
        <p className='text-center '>
          Don't have an account? <span> Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
