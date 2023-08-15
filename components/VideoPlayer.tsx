"use client";

import ReactPlayer from "react-player";
import VideoControls from "@components/VideoControls";
import { useEffect, useRef, useState } from "react";
import { OnProgressProps } from "react-player/base";
import { useAppDispatch, useAppSelector } from "@app/GlobalRedux/hooks";
import {
  setMuted,
  togglePlayback,
  setCurrent,
  setVolume,
  toggleMuted,
} from "@app/GlobalRedux/Features/VideoControls/videoControlsSlice";

interface VideoPlayerProps {
  src: string;
  id: string;
  options: {
    controls?: boolean;
    audioSlider?: boolean;
    play?: boolean;
    progress?: boolean;
    thumbnail?: boolean;
    report?: boolean;
    hover?: boolean;
  };
  hoverOnlyControls?: boolean;
  href?: string;
  isModal?: boolean;
  modalProgressHandler?(state: OnProgressProps): void;
  callback?(elem: ReactPlayer | null, id?: string): void;
}

export default function VideoPlayer({
  src,
  id,
  options: {
    controls = true,
    audioSlider = true,
    play = true,
    progress = true,
    thumbnail = true,
    report = true,
    hover = false,
  },
  href,
  isModal = false,
  modalProgressHandler,
  callback,
}: VideoPlayerProps) {
  const videoRef = useRef<ReactPlayer | null>(null);
  const [hasWindow, setHasWindow] = useState(false);
  const [videoState, setVideoState] = useState({
    played: 0,
  });
  const { played } = videoState;
  const muted = useAppSelector((state) => state.videoControls.muted);
  const volume = useAppSelector((state) => state.videoControls.volume);
  const playback = useAppSelector((state) => state.videoControls.playback);
  const active = useAppSelector((state) => state.videoControls.current === id);
  const modalOpen = useAppSelector((state) => state.events.modal)
    ? true
    : false;
  const modalCheck = (isModal && modalOpen) || (!isModal && !modalOpen);
  const playing = active && playback && modalCheck;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") setHasWindow(true);
  }, []);

  const formatTime = (time: number) => {
    if (isNaN(time)) {
      return "00:00";
    }

    const date = new Date(time * 1000);
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  const time = videoRef.current
    ? formatTime(videoRef.current.getCurrentTime())
    : "00:00";

  const duration = videoRef.current
    ? formatTime(videoRef.current.getDuration())
    : "00:00";

  const playbackHandler = () => {
    if (!active) {
      dispatch(setCurrent(id));
    } else {
      dispatch(togglePlayback());
    }
  };

  const volumeChangeHandler = (e: Event, value: number) => {
    const newVolume = value / 100;
    dispatch(setVolume(newVolume));
    dispatch(setMuted(newVolume > 0 ? false : true));
  };

  // const volumeSeekHandler = (e: Event, value: number) => {
  //   const newVolume = value / 100;
  //   dispatch(setVolume(newVolume));
  //   dispatch(setMuted(newVolume > 0 ? false : true));
  // };

  const muteHandler = () => {
    dispatch(toggleMuted());
  };

  const pauseHandler = () => {
    if (!active) {
      setVideoState({ ...videoState, played: 0 });
      videoRef.current?.seekTo(0);
    }
  };

  const progressHandler = (state: OnProgressProps) => {
    setVideoState({ ...videoState, ...state });
  };

  const videoSeekHandler = (e: Event, value: number) => {
    seek(value);
  };

  const seek = (value: number) => {
    setVideoState({ ...videoState, played: value / 100 });
    videoRef.current?.seekTo(value === 100 ? 0 : value / 100);
  };

  return hasWindow ? (
    <div className='flex flex-col relative h-full w-full'>
      <ReactPlayer
        key={id}
        ref={(elem) => {
          videoRef.current = elem;
          callback && callback(elem, id);
        }}
        url={src}
        width='100%'
        height='100%'
        playing={playing}
        muted={muted}
        volume={volume}
        onProgress={isModal ? modalProgressHandler : progressHandler}
        onPause={pauseHandler}
        playsinline
        loop
      />
      {/* {!active && !thumbnail && (
        <div className='z-10 absolute w-full h-full'>
          <img loading='lazy' src='/a.jpg'></img>
        </div>
      )} */}
      {controls && (
        <VideoControls
          onPlay={playbackHandler}
          onVolumeChange={volumeChangeHandler}
          onMute={muteHandler}
          volume={volume}
          muted={muted}
          playback={playing}
          progressBar={active}
          duration={duration}
          time={time}
          played={played}
          onSeek={videoSeekHandler}
          href={href}
          options={{
            audioSlider,
            play,
            progress,
            report,
            hover,
          }}
          id={id}
        />
      )}
    </div>
  ) : (
    <div></div>
  );
}
