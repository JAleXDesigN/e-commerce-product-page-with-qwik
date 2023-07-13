import { component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./modal.scss?inline";
import { closeOnAnimationEnd } from "~/helpers/close-on-animation-end";
import { useSliderContext } from "~/context/slider-context";
import { Content } from "./content";

export const Modal = component$(() => {
  useStylesScoped$(styles);

  const backdropRef = useSignal<Element>();

  const {
    store: { isPreviewOpen },
    closePreview,
  } = useSliderContext();

  return (
    <>
      {isPreviewOpen && (
        <div
          ref={backdropRef}
          class="backdrop"
          onAnimationEnd$={closeOnAnimationEnd("modal-exit", closePreview)}
        >
          <Content backdropRef={backdropRef} />
        </div>
      )}
    </>
  );
});
