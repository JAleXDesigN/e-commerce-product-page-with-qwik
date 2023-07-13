import type { Signal } from "@builder.io/qwik";
import { $, component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./drawer.scss?inline";
import { setCloseAttribute } from "~/helpers/set-close-attribute";
import { Navigation } from "../header/navigation";
import { closeOnAnimationEnd } from "~/helpers/close-on-animation-end";
import useClickOutside from "~/hooks/use-click-outside";
import { mergeRefs } from "~/helpers/merge-refs";
import { ActionButton } from "../buttons/action-button";
import { useMediaQuery } from "~/hooks/use-media-query";

export interface DrawerProps {
  isMenuOpen: Signal<boolean>;
}

export const Drawer = component$<DrawerProps>(({ isMenuOpen }) => {
  useStylesScoped$(styles);
  const drawerRef = useSignal<Element>();
  const overlayRef = useSignal<Element>();

  const handleClose = $(() => setCloseAttribute(overlayRef, drawerRef));
  const handleAnimationEnd = closeOnAnimationEnd("overlay-exit", isMenuOpen);

  const ref = useClickOutside(handleClose);

  useMediaQuery("(min-width: 768px)", handleClose);

  return (
    <>
      {isMenuOpen.value && (
        <div
          class="overlay"
          ref={overlayRef}
          onAnimationEnd$={handleAnimationEnd}
        >
          <div
            ref={mergeRefs(ref, drawerRef)}
            class="drawer"
          >
            <ActionButton
              onlyMobile
              action="close"
              aria-label="Close menu"
              onClick$={handleClose}
            />

            <Navigation type="vertical" />
          </div>
        </div>
      )}
    </>
  );
});
