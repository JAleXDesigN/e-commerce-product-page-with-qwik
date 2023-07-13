import type { QwikIntrinsicElements } from "@builder.io/qwik";
import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./cart-list.scss?inline";
import { currencyFormatter } from "~/helpers/format-price";
import { useCartContext } from "~/context/cart-context";
import { PrimaryButton } from "../buttons/primary-button";
import { DeleteButton } from "../buttons/delete-button";
import type { ItemInfo } from "~/context/types";

type DivElementProps = QwikIntrinsicElements["div"];

type CartListProps = DivElementProps & {
  cartItems: ItemInfo[];
};

export const CartList = component$<CartListProps>(({ cartItems, ...rest }) => {
  useStylesScoped$(styles);

  const { removeItem } = useCartContext();
  return (
    <div
      class="cart-list"
      {...rest}
    >
      <h2 class="title">Cart</h2>
      <div class="items-group">
        {cartItems.length > 0 ? (
          cartItems.map(
            ({ id, name, image, priceWithDiscount, quantity, total }) => (
              <div
                key={name}
                class="item"
              >
                <img
                  src={image}
                  alt={`Product ${name}`}
                  width={40}
                  height={40}
                />
                <div class="item-data">
                  <span>{name}</span>
                  <p>
                    {currencyFormatter(priceWithDiscount)} x {quantity}
                    <span>{currencyFormatter(total)}</span>
                  </p>
                </div>
                <DeleteButton onClick$={() => removeItem(id)} />
              </div>
            )
          )
        ) : (
          <p>Your cart is empty</p>
        )}
        {cartItems.length > 0 && <PrimaryButton label="Check out" />}
      </div>
    </div>
  );
});
