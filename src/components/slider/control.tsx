import type { QwikIntrinsicElements } from "@builder.io/qwik";
import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./control.scss?inline";

export interface ControlProps
  extends Pick<QwikIntrinsicElements["button"], "onClick$"> {
  type: "prev" | "next";
  design: "mobile" | "modal";
}

export const Control = component$<ControlProps>(({ type, design, ...rest }) => {
  useStylesScoped$(styles);
  return (
    <button
      type="button"
      data-position={type === "prev" ? "left" : "right"}
      class={["slider-control", design]}
      aria-label={`Go to ${type === "prev" ? "previous" : "next"} image`}
      {...rest}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${type === "prev" ? 12 : 13} 18`}
      >
        <path
          d={type === "prev" ? "M11 1 3 9l8 8" : "m2 1 8 8-8 8"}
          stroke="currentColor"
          stroke-width="3"
          fill="none"
        />
      </svg>
    </button>
  );
});
