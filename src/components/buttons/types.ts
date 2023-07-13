import type { QwikIntrinsicElements } from "@builder.io/qwik";

export type ButtonProps = Exclude<
  QwikIntrinsicElements["button"],
  "type" | "class"
>;

export interface PrimaryButtonProps extends ButtonProps {
  label: string;
  withCartIcon?: boolean;
  withShadow?: boolean;
}

export interface QuantityButtonProps extends ButtonProps {
  action: "increase" | "decrease";
}

export interface MenuButtonProps extends ButtonProps {
  action: "open" | "close";
  size?: "small" | "large";
  color?: "light" | "dark";
  onlyMobile?: boolean;
}
