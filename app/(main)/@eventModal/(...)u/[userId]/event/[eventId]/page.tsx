"use client";

import { setModal } from "@app/GlobalRedux/Features/Events/eventSlice";
import { useAppDispatch } from "@app/GlobalRedux/hooks";
import { useEffect } from "react";

interface EventParamProps {
  params: {
    userId: string;
    eventId: string;
  };
}

export default function eventModal({
  params: { userId, eventId },
}: EventParamProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setModal(eventId));

    return () => {
      dispatch(setModal(null));
    };
  }, []);

  return null;
}
