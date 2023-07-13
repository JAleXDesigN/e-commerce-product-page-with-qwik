import type { QRL } from "@builder.io/qwik";
import { $, useOnDocument, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import {
  FOCUS_SELECTOR,
  isFocusable,
  createAriaHider,
  scopeTab,
} from "./helpers";

type AriaHiderFn = QRL<() => void>;

const useFocusTrap = (closeOnEscape?: QRL<(ref: Element) => void>) => {
  const focusTrapRef = useSignal<Element>();
  const restoreAria = useSignal<AriaHiderFn | null>(null);

  const focusNode = $((node: Element) => {
    let focusElement = node.querySelector<HTMLElement>("[data-autofocus]");

    if (!focusElement) {
      const children = Array.from(
        node.querySelectorAll<HTMLElement>(FOCUS_SELECTOR)
      );
      focusElement = children.find(isFocusable) || null;
    }

    if (focusElement) focusElement.focus({ preventScroll: true });
  });

  useVisibleTask$(({ track }) => {
    const activeElement = document.activeElement as HTMLElement;
    const trapRef = track(() => focusTrapRef.value);

    if (!trapRef) {
      if (restoreAria.value) {
        restoreAria.value();
        restoreAria.value = null;
      }
      return;
    }

    restoreAria.value = createAriaHider(trapRef);
    focusNode(trapRef);

    return () => {
      activeElement?.focus();
      restoreAria.value?.();
    };
  });

  const handelKeyDown = $((event: Event) => {
    if (!(event instanceof KeyboardEvent)) return;
    const { key } = event;
    const ref = focusTrapRef.value;

    if (key === "Escape" && ref && closeOnEscape) {
      closeOnEscape(ref);
    }
    if (key === "Tab" && ref) {
      scopeTab(event, ref);
    }
  });

  useOnDocument("keydown", handelKeyDown);

  return focusTrapRef;
};

export default useFocusTrap;
