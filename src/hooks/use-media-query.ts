import type { QRL } from "@builder.io/qwik";
import { $, useSignal, useVisibleTask$ } from "@builder.io/qwik";

const getMatches = (query: string): boolean => {
  return typeof window === "undefined"
    ? false
    : window.matchMedia(query).matches;
};

export const useMediaQuery = (query: string, handler?: QRL<() => void>) => {
  const matches = useSignal<boolean>(getMatches(query));

  const handleChange = $(() => {
    const match = getMatches(query);
    matches.value = match;
    if (match && handler) handler();
  });

  useVisibleTask$(() => {
    if (typeof window !== "undefined") {
      handleChange();

      const matchMedia = window.matchMedia(query);

      matchMedia.addEventListener("change", handleChange);

      return () => matchMedia.removeEventListener("change", handleChange);
    }
  });

  return matches;
};
