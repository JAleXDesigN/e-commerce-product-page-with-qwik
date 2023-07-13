import { component$ } from "@builder.io/qwik";
import styles from "./primary-button.module.scss";
import { IconCart } from "~/components/icons/icon-cart";
import type { PrimaryButtonProps } from "./types";

const { primary_button, with_icon, with_shadow } = styles;

export const PrimaryButton = component$<PrimaryButtonProps>(
  ({ label, withCartIcon = false, withShadow = false, children, ...rest }) => {
    return (
      <button
        type="button"
        class={{
          [primary_button]: true,
          [with_icon]: withCartIcon,
          [with_shadow]: withShadow,
        }}
        {...rest}
      >
        {withCartIcon && <IconCart />}
        {label ? label : children}
      </button>
    );
  }
);
