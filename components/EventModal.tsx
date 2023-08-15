"use client";

import React, {
  KeyboardEventHandler,
  MouseEventHandler,
  MutableRefObject,
  WheelEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import Close from "@public/icons/close.svg";
import ArrowMin from "@public/icons/arrowMin.svg";
import Following from "@public/icons/following.svg";
import Play from "@public/icons/play.svg";
import Pause from "@public/icons/pause.svg";
import Icon from "@components/Icon";
import { Modal, Slider } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@app/GlobalRedux/hooks";
import {
  setCurrent,
  setMuted,
  setVolume,
  toggleMuted,
  togglePlayback,
} from "@app/GlobalRedux/Features/VideoControls/videoControlsSlice";
import SearchBar from "@components/SearchBar";
import { VolumeMute, VolumeUp } from "@mui/icons-material";
import Link from "next/link";
import VideoPlayer from "@components/VideoPlayer";
import {
  Event as EventType,
  selectEventById,
} from "@app/GlobalRedux/Features/Events/eventSlice";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";

interface EventModalProps {
  videoRefs: MutableRefObject<Record<string, ReactPlayer | null>>;
  eventIds: string[];
}

export default function EventModal({ videoRefs, eventIds }: EventModalProps) {
  const router = useRouter();
  const path = usePathname();
  const dispatch = useAppDispatch();
  const muted = useAppSelector((state) => state.videoControls.muted);
  const volume = useAppSelector((state) => state.videoControls.volume);
  const playback = useAppSelector((state) => state.videoControls.playback);
  const id = useAppSelector((state) => state.events.modal)!;
  const currEventIndex = eventIds.indexOf(id);
  const open = id ? true : false;
  const event: EventType | undefined = useAppSelector((state) =>
    selectEventById(state, id)
  );
  const prevEvent: EventType | undefined = useAppSelector((state) =>
    selectEventById(state, eventIds[currEventIndex - 1])
  );
  const nextEvent: EventType | undefined = useAppSelector((state) =>
    selectEventById(state, eventIds[currEventIndex + 1])
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
  const [videoState, setVideoState] = useState({
    played: 0,
  });
  const { played } = { ...videoState };
  const modalRef = useRef<ReactPlayer | null>(null);
  const setModalRef = (elem: ReactPlayer | null) => {
    modalRef.current = elem;
  };
  const formatTime = (time: number) => {
    if (isNaN(time)) {
      return "00:00";
    }

    const date = new Date(time * 1000);
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");

    return `${minutes}:${seconds}`;
  };
  const time = modalRef.current
    ? formatTime(modalRef.current.getCurrentTime())
    : "00:00";

  const duration = modalRef.current
    ? formatTime(modalRef.current.getDuration())
    : "00:00";

  const muteHandler = () => {
    dispatch(toggleMuted());
  };

  const volumeChangeHandler = (e: Event, value: number | number[]) => {
    const newVolume = (value as number) / 100;
    dispatch(setVolume(newVolume));
    dispatch(setMuted(newVolume > 0 ? false : true));
  };

  const progressHandler = (state: OnProgressProps) => {
    setVideoState({ ...videoState, ...state });
  };

  const videoSeekHandler = (e: Event, value: number | number[]) => {
    seek(value as number);
  };

  const seek = (value: number) => {
    setVideoState({ ...videoState, played: value / 100 });
    modalRef.current?.seekTo(value === 100 ? 0 : value / 100);
  };

  const closeModal = () => {
    const closeTime = modalRef.current?.getCurrentTime()!;
    videoRefs?.current[videoId!]?.seekTo(closeTime);
    dispatch(setCurrent(videoId));
    router.back();
  };

  const videoClickHandler: MouseEventHandler = (e) => {
    const target = e.currentTarget as HTMLElement;
    if (target.classList.contains("Video")) {
      dispatch(togglePlayback());
    }
  };

  const changeEvent = (event: EventType | undefined) => {
    if (event) {
      router.replace(`u/${event.userId}/event/${event.id}`);
    }
  };

  const handleKeyPress: KeyboardEventHandler = (e) => {
    if (e.key === "Escape" && open) {
      closeModal();
    }
  };

  const handleScroll: WheelEventHandler = (e) => {
    if (e.deltaY < 0) {
      changeEvent(prevEvent);
    } else {
      changeEvent(nextEvent);
    }
  };

  useEffect(() => {
    if (videoId) {
      dispatch(setCurrent(videoId));
    }
  }, [videoId]);

  return (
    <Modal open={open} key={path} disableEscapeKeyDown>
      <div
        className='bg-gray-700 h-full w-full m-auto flex fill-white text-white'
        onKeyDown={handleKeyPress}
      >
        <div
          className='flex-shrink sm:flex-none lg:flex-grow relative w-[640px] Video'
          onWheel={handleScroll}
        >
          <div className='absolute h-full w-full flex items-center justify-center'>
            <img className='w-full blur-md' loading='lazy' src='/a.jpg' />
          </div>
          <button
            className='absolute w-full h-full Video'
            onClick={videoClickHandler}
          >
            <div className='relative w-full h-full'>
              <VideoPlayer
                id={videoId!}
                src={videoId!}
                options={{
                  controls: false,
                }}
                isModal={true}
                modalProgressHandler={progressHandler}
                callback={setModalRef}
              />
            </div>
          </button>
          <div className='pointer-events-none absolute flex flex-col justify-between h-full w-full'>
            <div className='flex justify-between items-center gap-1 p-3'>
              <button
                className='pointer-events-auto rounded-full bg-gray-600 hover:bg-gray-700 p-3'
                onClick={closeModal}
              >
                <Icon Svg={Close} width={20} height={20} />
              </button>
              <div className='text-black pointer-events-auto flex-1 h-5/6 max-w-md'>
                <SearchBar />
              </div>
              <button className='pointer-events-auto rounded-full bg-gray-600 hover:bg-gray-700 p-2'>
                Report
              </button>
            </div>
            <div className='w-full self-end flex flex-row-reverse justify-between items-center p-3'>
              <div className='flex flex-col gap-2'>
                <button
                  className='pointer-events-auto -rotate-90 rounded-full bg-gray-600 hover:bg-gray-700 p-3'
                  style={{
                    visibility: prevEvent ? "visible" : "hidden",
                  }}
                  onClick={(event) => changeEvent(prevEvent)}
                >
                  <Icon Svg={ArrowMin} width={20} height={20} />
                </button>
                <button
                  className='pointer-events-auto rotate-90 rounded-full bg-gray-600 hover:bg-gray-700 p-3'
                  style={{
                    visibility: nextEvent ? "visible" : "hidden",
                  }}
                  onClick={(event) => changeEvent(nextEvent)}
                >
                  <Icon Svg={ArrowMin} width={20} height={20} />
                </button>
              </div>
              <div>
                {!playback && <Icon Svg={Play} width={75} height={75} />}
              </div>
              <div className='w-[30px]'></div>
            </div>
            <div className='flex-col pointer-events-auto'>
              <div className='h-[20px]'>
                <Slider
                  className='text-white'
                  value={played * 100}
                  onChange={videoSeekHandler}
                />
              </div>
              <div className='px-3 py-2 flex justify-between items-center'>
                <div className='flex items-center'>
                  <button onClick={() => dispatch(togglePlayback())}>
                    {playback ? (
                      <Icon Svg={Pause} width={30} height={30} />
                    ) : (
                      <Icon Svg={Play} width={30} height={30} />
                    )}
                  </button>
                  <span className='ml-2'>
                    {time}/{duration}
                  </span>
                </div>
                <div className='relative pointer-events-auto group'>
                  <div className='absolute w-full h-[130px] bottom-[35px] justify-center hidden active:flex group-hover:flex'>
                    <div className='bg-gray-700 h-fit rounded-full py-2'>
                      <Slider
                        className='h-[80px] text-white'
                        onChange={volumeChangeHandler}
                        size='small'
                        value={muted ? 0 : volume * 100}
                        orientation='vertical'
                      />
                    </div>
                  </div>
                  <button
                    className='pointer-events-auto rounded-full flex items-center'
                    onClick={muteHandler}
                  >
                    {muted ? (
                      <VolumeMute className='' fontSize='large' />
                    ) : (
                      <VolumeUp className='' fontSize='large' />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='hidden sm:block sm:w-[500px] sm:max-w-none z-10'>
          <div className='flex flex-col h-full w-full'>
            <div className='flex items-center px-6 py-3'>
              <div className='mt-6 w-full space-y-2'>
                <div className='flex justify-between gap-2'>
                  <div className='flex'>
                    <a
                      className='fill-white self-start border-2 border-red-500 rounded-full overflow-hidden'
                      href={`/u/${userId}`}
                    >
                      <Icon height={40} width={40} Svg={Following} />
                    </a>
                    <div className='ml-2 flex flex-col'>
                      <a
                        className='font-bold text-lg/6 hover:underline'
                        href={`/u/${userId}`}
                      >
                        {userId}
                      </a>
                      <a
                        className='font-semibold text-sm'
                        href={`/u/${userId}`}
                      >
                        Name
                      </a>
                    </div>
                  </div>
                  <button className='my-1 px-6 rounded-md border-2 border-green-500 text-green-500 transition duration-100 hover:bg-green-100 font-semibold'>
                    Follow
                  </button>
                </div>
                <div className='flex flex-col gap-2'>
                  <div>
                    <span>{`${description} `}</span>
                    {categories?.map((cat: string, idx: number) => (
                      <a
                        className='hover:underline font-semibold inline pr-2'
                        href={`/browse/${cat}`}
                        key={`${id}cat${idx}`}
                      >
                        {`#${cat}`}
                      </a>
                    ))}
                  </div>
                  <Link
                    className='font-bold text-green-500'
                    href={"https://www.example.com"}
                  >
                    example.com
                  </Link>
                  <div className='flex flex-between'>
                    <div className='flex'>
                      <div className='rounded-full bg-gray-500 p-1'>
                        <Icon Svg={Following} height={18} width={18} />
                      </div>
                      <span className='font-bold text-sm my-auto ml-2'>
                        {views}
                      </span>
                      <div className='ml-4 rounded-full bg-gray-500 p-1'>
                        <Icon Svg={Following} height={18} width={18} />
                      </div>
                      <span className='font-bold text-sm my-auto ml-2'>
                        {likes}
                      </span>
                      <div className='ml-4 rounded-full bg-gray-500 p-1'>
                        <Icon Svg={Following} height={18} width={18} />
                      </div>
                      <span className='font-bold text-sm my-auto ml-2'>
                        {comments}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex-grow min-h-0 overflow-y-auto overflow-x-hidden border-y-2 px-6 py-4'>
              <div>testtssets</div>
              <div>testtssets</div>
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
            <div className='flex items-center px-6 py-4'>
              <button className='bg-gray-600 p-4 w-full'>
                <p className='text-green-400 font-semibold'>
                  Log in to comment
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
