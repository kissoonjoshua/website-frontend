import React from "react";

interface LoginSelectButtonProps {
  method: string;
  icon: React.ReactNode;
  onclick: () => void;
}

function LoginSelectButton({ method, icon, onclick }: LoginSelectButtonProps) {
  return (
    <div
      className='cursor-pointer flex justify-center items-center border border-zinc-300 p-2 my-4 font-semibold'
      onClick={onclick}
    >
      <div className='relative flex-1 text-center'>
        {`Continue with ${method}`}
        <div className='absolute left-0 top-0'>{icon}</div>
      </div>
    </div>
  );
}

export default LoginSelectButton;
