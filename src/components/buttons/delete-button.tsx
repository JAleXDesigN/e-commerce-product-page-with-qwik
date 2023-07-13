import { component$ } from "@builder.io/qwik";
import styles from "./delete-button.module.scss";
import type { ButtonProps } from "./types";
import { IconDelete } from "../icons/icon-delete";

export const DeleteButton = component$<ButtonProps>((props) => {
  return (
    <button
      type="button"
      class={styles.delete_button}
      {...props}
    >
      <IconDelete />
    </button>
  );
});
