import { $, component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./header.scss?inline";
import { Logo } from "./logo";
import { Navigation } from "./navigation";
import { Cart } from "../cart/cart";
import { Drawer } from "../drawer/drawer";
import { Avatar } from "../avatar/avatar";
import { ActionButton } from "../buttons/action-button";

export const Header = component$(() => {
  useStylesScoped$(styles);

  const isMenuOpen = useSignal(false);
  const isCartOpen = useSignal(false);

  const toggleMenu = $(() => {
    isMenuOpen.value = !isMenuOpen.value;
  });

  return (
    <>
      <header class="header">
        <div class="content">
          <ActionButton
            onlyMobile
            action="open"
            aria-label={isMenuOpen.value ? "Close menu" : "Open menu"}
            onClick$={toggleMenu}
          />
          <Logo />
          <div class="nav-group">
            <Navigation type="horizontal" />
            <div class="cart-group">
              <Cart
                isCartOpen={isCartOpen}
                cartItems={[]}
              />
              <Avatar />
            </div>
          </div>
        </div>
      </header>
      <Drawer isMenuOpen={isMenuOpen} />
    </>
  );
});
