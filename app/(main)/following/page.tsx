"use client";

import FollowItem from "@components/FollowItem";
import Placeholder from "@public/a.jpg";
import TempIcon from "@public/icons/following.svg";

export default function Following() {
  return (
    <div className='flex flex-col items-center overflow-y-auto'>
      <div className='flex w-5/6 max-w-3xl gap-5 justify-center flex-wrap fill-white'>
        <FollowItem
          bg={Placeholder}
          name={"temp"}
          username='temp'
          Svg={TempIcon}
        />
        <FollowItem
          bg={Placeholder}
          name={"temp"}
          username='temp'
          Svg={TempIcon}
        />
        <FollowItem
          bg={Placeholder}
          name={"temp"}
          username='temp'
          Svg={TempIcon}
        />
        <FollowItem
          bg={Placeholder}
          name={"temp"}
          username='temp'
          Svg={TempIcon}
        />
        <FollowItem
          bg={Placeholder}
          name={"temp"}
          username='temp'
          Svg={TempIcon}
        />
        <FollowItem
          bg={Placeholder}
          name={"temp"}
          username='temp'
          Svg={TempIcon}
        />
        <FollowItem
          bg={Placeholder}
          name={"temp"}
          username='temp'
          Svg={TempIcon}
        />
        <FollowItem
          bg={Placeholder}
          name={"temp"}
          username='temp'
          Svg={TempIcon}
        />
        <FollowItem
          bg={Placeholder}
          name={"temp"}
          username='temp'
          Svg={TempIcon}
        />
      </div>
    </div>
  );
}
