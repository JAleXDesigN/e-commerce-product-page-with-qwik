import { component$ } from "@builder.io/qwik";
import styles from "./action-button.module.scss";
import type { MenuButtonProps } from "./types";
import { IconClose } from "../icons/icon-close";
import { IconMenu } from "../icons/icon-menu";

const { action_button, only_mobile } = styles;

export const ActionButton = component$<MenuButtonProps>(
  ({ action, size = "large", color = "dark", onlyMobile = false, ...rest }) => {
    return (
      <button
        type="button"
        class={{
          [action_button]: true,
          [styles[size]]: size,
          [styles[color]]: color,
          [only_mobile]: onlyMobile,
        }}
        {...rest}
      >
        {action === "open" ? <IconMenu /> : <IconClose />}
      </button>
    );
  }
);
