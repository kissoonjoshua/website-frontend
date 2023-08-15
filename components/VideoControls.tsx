import { Slider } from "@mui/material";
import { Pause, PlayArrow, VolumeUp, VolumeMute } from "@mui/icons-material";
import { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";

interface VideoControlsProps {
  onPlay(): void;
  onVolumeChange(e: Event, value: number | number[]): void;
  onMute(): void;
  onSeek(e: Event, value: number | number[]): void;
  playback: boolean;
  volume: number;
  muted: boolean;
  progressBar: boolean;
  duration: string;
  time: string;
  played: number;
  href: string | undefined;
  options: {
    audioSlider: boolean;
    play: boolean;
    progress: boolean;
    report: boolean;
    hover: boolean;
  };
  id: string;
}

export default function VideoControls({
  onPlay,
  onVolumeChange,
  onMute,
  onSeek,
  playback,
  volume,
  muted,
  progressBar,
  duration,
  time,
  played,
  href,
  options: { audioSlider, play, progress, report, hover },
  id,
}: VideoControlsProps) {
  const router = useRouter();

  const videoClickHandler: MouseEventHandler = (e) => {
    if (href !== undefined) {
      // router.push(`#${id}`);
      router.push(href);
    }
  };

  return (
    <div
      tabIndex={hover ? undefined : 0}
      className='z-20 absolute w-full h-full opacity-0 hover:opacity-100 focus:opacity-100 duration-200 text-white flex flex-col justify-between'
    >
      <div className='flex flex-col h-full w-full relative'>
        <button
          className='absolute h-full w-full eventClick'
          onClick={videoClickHandler}
        ></button>
        <div className='z-30 pointer-events-none flex flex-col justify-between flex-auto p-2'>
          <div className='flex justify-end'>
            {report && (
              <button className='pointer-events-auto text-white font-semibold'>
                Report
              </button>
            )}
          </div>
          <div className='flex justify-between'>
            {play ? (
              <button className='pointer-events-auto self-end' onClick={onPlay}>
                {playback ? (
                  <Pause fontSize='large' />
                ) : (
                  <PlayArrow fontSize='large' />
                )}
              </button>
            ) : (
              <div></div>
            )}
            <div className='pointer-events-auto group flex flex-col items-center gap-2 justify-end'>
              {audioSlider && (
                <div className='hidden group-hover:block active:block rounded-full flex-1 bg-black bg-opacity-40 py-3'>
                  <Slider
                    className='h-[80px] text-white'
                    onChange={onVolumeChange}
                    size='small'
                    value={muted ? 0 : volume * 100}
                    orientation='vertical'
                  />
                </div>
              )}
              <button className='' onClick={onMute}>
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
      {progress && (
        <div className='flex flex-col px-3 pb-3'>
          <div
            className='flex items-center'
            style={{ visibility: progressBar ? "visible" : "hidden" }}
          >
            <Slider
              className='flex-auto text-white'
              size='small'
              value={played * 100}
              onChange={onSeek}
            />
            <span className='flex-none ml-2 text-xs'>
              {time}/{duration}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
