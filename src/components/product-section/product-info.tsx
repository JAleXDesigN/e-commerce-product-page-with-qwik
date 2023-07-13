import { component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./product-info.scss?inline";
import type { ProductInfo as ProductInfoProps } from "~/constants";
import { currencyFormatter, priceWithDiscount } from "~/helpers/format-price";
import { PrimaryButton } from "../buttons/primary-button";
import { QuantityButton } from "../buttons/quantity-button";
import { updateQuantity } from "~/helpers/product-quantity";
import { useCartContext } from "~/context/cart-context";

export const ProductInfo = component$<ProductInfoProps & { thumbnail: string }>(
  ({ id, company, name, description, price, discountPercent, thumbnail }) => {
    useStylesScoped$(styles);
    const quantity = useSignal(0);

    const { withCurrencyFormat, withoutCurrencyFormat } = priceWithDiscount(
      price,
      discountPercent
    );

    const { addItem } = useCartContext();

    return (
      <div class="info">
        <span class="company-name">{company}</span>
        <h1 class="product-title">{name}</h1>
        <p class="product-description">{description}</p>

        <div class="price-group">
          <div class="price-with-discount">
            {withCurrencyFormat}
            <span>{discountPercent}%</span>
          </div>
          <span class="normal-price">{currencyFormatter(price)}</span>
        </div>

        <div class="add-to-cart">
          <div class="quantity-group">
            <QuantityButton
              action="decrease"
              onClick$={() => updateQuantity("decrease", quantity)}
            />
            <span class="quantity-number">{quantity.value}</span>
            <QuantityButton
              action="increase"
              onClick$={() => updateQuantity("increase", quantity)}
            />
          </div>

          <PrimaryButton
            label="Add to cart"
            withCartIcon
            withShadow
            onClick$={() => {
              addItem({
                id,
                image: thumbnail,
                name,
                priceNormal: price,
                priceWithDiscount: withoutCurrencyFormat,
                discountPercent,
                quantity: quantity.value,
              });
              quantity.value = 0;
            }}
          />
        </div>
      </div>
    );
  }
);
