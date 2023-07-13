import { component$ } from "@builder.io/qwik";
import styles from "./quantity-button.module.scss";
import type { QuantityButtonProps } from "./types";
import { IconPlus } from "../icons/icon-plus";
import { IconMinus } from "../icons/icon-minus";

export const QuantityButton = component$<QuantityButtonProps>(
  ({ action, ...rest }) => {
    return (
      <button
        type="button"
        class={styles.quantity_button}
        {...rest}
      >
        {action === "increase" ? <IconPlus /> : <IconMinus />}
      </button>
    );
  }
);
