import type { QwikIntrinsicElements } from "@builder.io/qwik";
import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./avatar.scss?inline";
import { onAnimationEnd, onInteractionStart } from "./animation";

type AvatarProps = Pick<
  QwikIntrinsicElements["img"],
  "src" | "alt" | "width" | "height"
>;

export const avatarSrc =
  "https://res.cloudinary.com/dekp1iyjf/image/upload/w_50,h_50/v1673909165/ecommerce-fementor/image-avatar_kkrq90.webp";

export const Avatar = component$<AvatarProps>(
  ({ src = avatarSrc, alt = "User Image", width = 40, height = 40 }) => {
    useStylesScoped$(styles);
    return (
      <div
        class="avatar"
        tabIndex={0}
        onMouseDown$={onInteractionStart}
        onTouchStart$={onInteractionStart}
        onAnimationEnd$={onAnimationEnd}
      >
        <img
          class="image"
          src={src}
          alt={alt}
          width={width}
          height={height}
        />
      </div>
    );
  }
);
