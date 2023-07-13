import type { QRL } from "@builder.io/qwik";
import { $, type QwikAnimationEvent, type Signal } from "@builder.io/qwik";

export const closeOnAnimationEnd = (
  animationName: string,
  handler: Signal<boolean> | QRL<() => void>
) => {
  return $((event: QwikAnimationEvent<Element>) => {
    if (event.animationName === animationName) {
      "value" in handler ? (handler.value = false) : handler();
    }
  });
};
