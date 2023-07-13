import type { Signal } from "@builder.io/qwik";
import { $, component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./content.scss?inline";
import useFocusTrap from "~/hooks/use-focus-trap";
import useClickOutside from "~/hooks/use-click-outside";
import { setCloseAttribute } from "~/helpers/set-close-attribute";
import { mergeRefs } from "~/helpers/merge-refs";
import { Slider } from "../slider/slider";

export interface ContentProps {
  backdropRef: Signal<Element | undefined>;
}

export const Content = component$<ContentProps>(({ backdropRef }) => {
  useStylesScoped$(styles);

  const handleClose = $(() => setCloseAttribute(backdropRef));

  const focusTrapRef = useFocusTrap(handleClose);
  const outsideRef = useClickOutside(handleClose);

  return (
    <div
      ref={mergeRefs(focusTrapRef, outsideRef)}
      class="modal-content"
    >
      <Slider
        design="modal"
        handleClose={handleClose}
      />
    </div>
  );
});
