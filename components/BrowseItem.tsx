import React, { MouseEventHandler } from "react";
import { useAppDispatch, useAppSelector } from "@app/GlobalRedux/hooks";
import {
  Event,
  selectEventById,
} from "@app/GlobalRedux/Features/Events/eventSlice";
import VideoPlayer from "@components/VideoPlayer";
import { setCurrent } from "@app/GlobalRedux/Features/VideoControls/videoControlsSlice";
import { PlayArrow } from "@mui/icons-material";
import ReactPlayer from "react-player";

interface BrowseItemProps {
  id: string;
  callback?(elem: ReactPlayer | null, id?: string): void;
}

export default function BrowseItem({ id, callback }: BrowseItemProps) {
  const dispatch = useAppDispatch();
  const event: Event | undefined = useAppSelector((state) =>
    selectEventById(state, id)
  );
  const { userId, title, categories, views, likes, comments, videoId } = {
    ...event,
  };

  const mouseEnterHandler: MouseEventHandler = (e) => {
    const id: string = e.currentTarget.id;
    dispatch(setCurrent(id));
  };

  return (
    <div className=''>
      <div
        id={videoId}
        className='rounded-lg flex flex-col relative justify-end items-center overflow-hidden'
        onMouseEnter={mouseEnterHandler}
      >
        <VideoPlayer
          id={videoId!}
          src={videoId!}
          href={`/u/${userId}/event/${id}`}
          options={{
            audioSlider: false,
            play: false,
            progress: false,
            report: false,
            hover: true,
          }}
          callback={callback}
        />
        <div className='pointer-events-none absolute ml-4 mb-4 self-start z-20 flex items-center'>
          <PlayArrow className='align-middle' />
          <p className='pb-0.5'>{views}</p>
        </div>
      </div>
    </div>
  );
}
