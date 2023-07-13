import type {
  QRL,
  QwikAnimationEvent,
  QwikMouseEvent,
  QwikTouchEvent,
} from "@builder.io/qwik";
import { $ } from "@builder.io/qwik";

type OnInteractionStartFn = QRL<
  (
    event:
      | QwikMouseEvent<HTMLDivElement, MouseEvent>
      | QwikTouchEvent<HTMLDivElement>,
    element: HTMLDivElement
  ) => void
>;

type OnAnimationEndFn = QRL<
  (event: QwikAnimationEvent<HTMLDivElement>, element: HTMLDivElement) => void
>;

export const onInteractionStart: OnInteractionStartFn = $(
  (event, currentElement) => {
    currentElement.style.animation = "none";
    currentElement.offsetHeight;
    currentElement.style.animation = `pulse 1s cubic-bezier(0.4, 0, 0.2, 1)`;
  }
);

export const onAnimationEnd: OnAnimationEndFn = $((event, currentElement) => {
  if (event.animationName === "pulse") {
    currentElement.removeAttribute("style");
  }
});
