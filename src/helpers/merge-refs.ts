import type { Signal } from "@builder.io/qwik";
import { $, noSerialize } from "@builder.io/qwik";

type Ref = Signal<Element | undefined> | ((el: Element) => void) | undefined;

export const assignRef = (ref: Ref, node: Element) => {
  if (typeof ref === "function") {
    ref(node);
  } else if (ref && typeof ref === "object" && "value" in ref) {
    ref.value = node;
  }
};

export const mergeRefs = (...refs: Ref[]) => {
  const refsNS = noSerialize(refs);
  return $((node: Element) => {
    if (!refsNS) return;
    refsNS.forEach((ref) => assignRef(ref, node));
  });
};
