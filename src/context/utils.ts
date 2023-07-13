import type { QwikMouseEvent, QwikTouchEvent } from "@builder.io/qwik";
import type { NavigateAction } from "./types";

export type MouseOrTouchEvent =
  | QwikMouseEvent<HTMLDivElement, MouseEvent>
  | QwikTouchEvent<HTMLDivElement>;

export const getClientX = (
  event: MouseOrTouchEvent,
  type: "touches" | "changedTouches"
) => {
  if (type === "touches") {
    return type in event ? event[type][0].clientX : event.clientX;
  }
  return type in event ? event[type][0].clientX : event.clientX;
};

export const getNextIndex = (
  action: NavigateAction,
  currentIndex: number,
  arrayLength: number
) => {
  return action === "prev"
    ? (currentIndex - 1 + arrayLength) % arrayLength
    : (currentIndex + 1) % arrayLength;
};
