import React from "react";
import VideoPlayer from "@components/VideoPlayer";
import { useAppSelector } from "@app/GlobalRedux/hooks";
import {
  Event,
  selectEventById,
} from "@app/GlobalRedux/Features/Events/eventSlice";
import Link from "next/link";
import Icon from "@components/Icon";
import Following from "@public/icons/following.svg";
import ReactPlayer from "react-player";

interface FYPItemProps {
  id: string;
  callback?(elem: ReactPlayer | null, id?: string): void;
}

export default function FYPItem({ id, callback }: FYPItemProps) {
  const event: Event | undefined = useAppSelector((state) =>
    selectEventById(state, id)
  );
  const {
    userId,
    title,
    description,
    categories,
    views,
    likes,
    comments,
    videoId,
  } = {
    ...event,
  };

  return (
    <div
      id={id}
      className='w-11/12 md:w-3/4 max-w-3xl overflow-hidden flex flex-col fill-white'
    >
      <div className='flex flex-1'>
        <div className='flex flex-col pt-2 items-start'>
          <Link
            className='fill-white border-2 border-red-500 rounded-full overflow-hidden'
            href={`/u/${userId}`}
          >
            <Icon Svg={Following} />
          </Link>
        </div>
        <div className='flex flex-col pt-1 ml-2 w-full'>
          <div className='flex justify-between'>
            <div>
              <Link
                className='text-white hover:underline font-bold block'
                href={`/u/${userId}`}
              >
                {userId}
              </Link>
              {categories?.map((cat: string, idx: number) => (
                <Link
                  className='hover:underline font-semibold inline pr-2'
                  href={`/browse/${cat}`}
                  key={`${id}cat${idx}`}
                >
                  {`#${cat}`}
                </Link>
              ))}
              <Link
                className='text-white hover:underline font-semibold block'
                href={`/u/${userId}/event/${id}`}
              >
                {title}
              </Link>
            </div>
            <div className='flex pt-2 flex-col'>
              <button className='rounded-md border-2 border-green-500 ml-4 py-1 px-4 text-green-500 transition duration-100 hover:bg-green-100 font-semibold'>
                Follow
              </button>
            </div>
          </div>
          <div className='mt-2 flex'>
            <div>
              <div
                id={videoId}
                className='h-[calc(max(400px,60vw))] max-h-[75vh] flex-grow relative FYPVideo'
              >
                <VideoPlayer
                  id={videoId!}
                  src={videoId!}
                  href={`/u/${userId}/event/${id}`}
                  options={{}}
                  callback={callback}
                />
              </div>
            </div>
            <div className='ml-4 flex-shrink flex flex-col items-start justify-end space-y-3'>
              <div>
                <div className='border-2 border-red-500 rounded-full overflow-hidden'>
                  <Icon Svg={Following} />
                </div>
                <p className='text-white text-center'>{likes}</p>
              </div>
              <div>
                <div className='border-2 border-red-500 rounded-full overflow-hidden'>
                  <Icon Svg={Following} />
                </div>
                <p className='text-white text-center'>{views}</p>
              </div>
              <div>
                <div className='border-2 border-red-500 rounded-full overflow-hidden'>
                  <Icon Svg={Following} />
                </div>
                <p className='text-white text-center'>{comments}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className='mt-3 border-1 border-gray-400' />
    </div>
  );
}
