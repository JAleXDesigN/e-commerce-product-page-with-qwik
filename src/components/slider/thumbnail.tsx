import type { QwikIntrinsicElements } from "@builder.io/qwik";
import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./thumbnail.scss?inline";

export interface ThumbnailProps
  extends Pick<QwikIntrinsicElements["button"], "onClick$"> {
  forModal: boolean;
  title: string;
  thumbnail: string;
  active: boolean;
}

export const Thumbnail = component$<ThumbnailProps>(
  ({ title, thumbnail, active, forModal, ...rest }) => {
    useStylesScoped$(styles);
    return (
      <button
        type="button"
        aria-label={`Select ${title}`}
        key={title}
        class={["thumbnail", { active, modal: forModal }]}
        {...rest}
      >
        <img
          src={thumbnail}
          alt={title}
          width={100}
          height={100}
        />
      </button>
    );
  }
);
