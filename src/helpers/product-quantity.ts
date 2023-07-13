import type { Signal } from "@builder.io/qwik";

type UpdateType = "increase" | "decrease";

export const updateQuantity = (type: UpdateType, quantity: Signal<number>) => {
  if (type === "decrease" && quantity.value === 0) return;
  console.log(type);

  quantity.value =
    type === "decrease" ? quantity.value - 1 : quantity.value + 1;
};
