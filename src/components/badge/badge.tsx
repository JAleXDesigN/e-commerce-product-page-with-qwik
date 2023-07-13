import type { QwikIntrinsicElements } from "@builder.io/qwik";
import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./badge.scss?inline";

type ButtonElementProps = QwikIntrinsicElements["button"];

export type BadgeProps = Pick<
  ButtonElementProps,
  "type" | "onClick$" | "aria-label" | "ref"
> & {
  number: number;
};

export const Badge = component$<BadgeProps>(
  ({ type = "button", number, ...rest }) => {
    useStylesScoped$(styles);
    return (
      <button
        type={type}
        class="badge"
        aria-label="Toggle Cart"
        {...rest}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 22 20"
        >
          <path
            d="M21 3.6H3.8L3.6.8a.9.9 0 0 0-.9-.8H1a.9.9 0 1 0 0 1.8h1l1 11.5c.1.8.5 1.7 1.3 2.3a2.7 2.7 0 1 0 4.7.8h5c-.7 1.7.6 3.6 2.5 3.6a2.7 2.7 0 0 0 2.7-2.7 2.7 2.7 0 0 0-2.7-2.7h-10c-.7 0-1.3-.4-1.6-1l14.4-.9a.9.9 0 0 0 .8-.7l1.8-7.2a.9.9 0 0 0-.9-1.2ZM6.3 18.2a1 1 0 0 1 0-1.8 1 1 0 0 1 0 1.8Zm10 0a1 1 0 0 1 0-1.8 1 1 0 0 1 0 1.8Zm2-7.2-13.8.8L4 5.4h15.8L18.4 11Z"
            fill="currentColor"
          />
        </svg>

        {number > 0 && <span class="number">{number}</span>}
      </button>
    );
  }
);
