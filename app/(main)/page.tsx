"use client";

import FYPItem from "@components/FYPItem";
import React, { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@app/GlobalRedux/hooks";
import {
  setUserStatus,
  setUserId,
} from "@app/GlobalRedux/Features/Users/userSlice";
import { setCurrent } from "@app/GlobalRedux/Features/VideoControls/videoControlsSlice";
import {
  selectEventIds,
  setEvents,
} from "@app/GlobalRedux/Features/Events/eventSlice";
import jwt_decode from "jwt-decode";
import EventModal from "@components/EventModal";
import ReactPlayer from "react-player";
import { exchangeCode } from "@app/client/exchangeCode";
import axios from "axios";

export default function Home() {
  const dispatch = useAppDispatch();
  const id = useAppSelector((state) => state.user.id);
  const eventIds: string[] = useAppSelector(selectEventIds);
  let events = {};
  const modalOpen = useAppSelector((state) => state.events.modal)
    ? true
    : false;
  let videos = {};
  const videoRefs = useRef<Record<string, ReactPlayer | null>>({});
  const addVideoRef = (elem: ReactPlayer | null, videoId: string) => {
    videoRefs.current[videoId] = elem;
  };
  let intersectionTimeout: NodeJS.Timeout | null = null;
  const options: IntersectionObserverInit = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const callback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (intersectionTimeout) {
          clearTimeout(intersectionTimeout);
          intersectionTimeout = null;
        }
        intersectionTimeout = setTimeout(() => {
          if (!modalOpen) {
            dispatch(setCurrent(entry.target.id));
          }
          intersectionTimeout = null;
        }, 1000);
      }
    });
  };

  useEffect(() => {
    const fetchExchangeCode = async (code: string) => {
      try {
        const data = await exchangeCode(code);
        localStorage.setItem("accessToken", data.data.access_token);
        localStorage.setItem("refreshToken", data.data.refresh_token);
        localStorage.setItem("idToken", data.data.id_token);
        const decodedToken = jwt_decode(data.data.id_token) as any;
        dispatch(setUserStatus(true));
        dispatch(setUserId(decodedToken.email));
      } catch (error) {
        console.error("Error exchanging code:", error);
      }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      fetchExchangeCode(code);
      window.history.pushState({}, document.title, window.location.pathname);
    }
    const idToken = localStorage.getItem("idToken");
    if (idToken != null) {
      const decodedToken = jwt_decode(idToken) as any;
      dispatch(setUserStatus(true));
      dispatch(setUserId(decodedToken.email));
    }
  }, []);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await axios.get(
          process.env.NEXT_PUBLIC_EVENT_DB_URL || ""
        );
        events = data.data;
        dispatch(setEvents(events));
      } catch (error) {
        console.error("Error fetching events");
      }
    };
    getEvents();
  }, []);

  useEffect(() => {
    const observer: IntersectionObserver = new IntersectionObserver(
      callback,
      options
    );
    const videoElems: HTMLCollectionOf<Element> =
      document.getElementsByClassName("FYPVideo");
    Object.values(videoElems).forEach((elem: Element) => {
      videos = { ...videos, [elem.id]: elem };
      observer.observe(elem);
    });
    return () => {
      observer.disconnect();
    };
  }, [modalOpen, events]);

  return (
    <div className='flex flex-col flex-1 overflow-y-auto text-white items-center space-y-3'>
      <EventModal videoRefs={videoRefs} eventIds={eventIds} />
      {eventIds.map((id: string) => (
        <FYPItem id={id} key={id} callback={addVideoRef} />
      ))}
      <div>loading</div>
    </div>
  );
}
