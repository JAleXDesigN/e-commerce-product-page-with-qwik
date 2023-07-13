import type { QwikAnimationEvent, Signal } from "@builder.io/qwik";
import { $, component$, useSignal } from "@builder.io/qwik";
import { Badge } from "../badge/badge";
import { CartList } from "./cart-list";
import useClickOutside from "~/hooks/use-click-outside";
import { mergeRefs } from "~/helpers/merge-refs";
import { setCloseAttribute } from "~/helpers/set-close-attribute";
import { useCartContext } from "~/context/cart-context";
import type { ItemInfo } from "~/context/types";

export interface CartProps {
  isCartOpen: Signal<boolean>;
  cartItems: ItemInfo[];
}

export const Cart = component$<CartProps>(({ isCartOpen }) => {
  const cartRef = useSignal<Element>();
  const ref = useClickOutside($(() => setCloseAttribute(cartRef)));

  const handleClick = $(() => {
    isCartOpen.value ? setCloseAttribute(cartRef) : (isCartOpen.value = true);
  });

  const handleAnimationEnd = $((event: QwikAnimationEvent<HTMLDivElement>) => {
    if (event.animationName === "cart-exit") isCartOpen.value = false;
  });

  const { store } = useCartContext();

  return (
    <div>
      <Badge
        number={store.items.length}
        ref={ref}
        onClick$={handleClick}
      />
      {isCartOpen.value && (
        <CartList
          cartItems={store.items}
          ref={mergeRefs(ref, cartRef)}
          onAnimationEnd$={handleAnimationEnd}
        />
      )}
    </div>
  );
});
