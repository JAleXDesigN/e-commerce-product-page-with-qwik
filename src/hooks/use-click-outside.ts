import type { QRL } from "@builder.io/qwik";
import { $, useOnDocument, useSignal } from "@builder.io/qwik";

type UseClickOutside = (
  handler: QRL<() => void>,
  active?: boolean
) => (node: Element) => void;

const useClickOutside: UseClickOutside = (handler, active = true) => {
  const refs = useSignal<Element[]>([]);

  const setRef = $((node: Element) => {
    const elementsRefs = refs.value;
    if (!node || elementsRefs?.includes(node)) return;
    const newRefs = [...refs.value, node];
    refs.value = newRefs;
  });

  const eventHandler = $((event: Event) => {
    if (!active || (event instanceof MouseEvent && event.button !== 0)) return;
    const target = event.target as HTMLElement;
    const nodes = refs.value;
    const shouldSkipHandler =
      nodes.includes(target) ||
      target?.hasAttribute("data-ignore-outside-clicks") ||
      !document.body.contains(target) ||
      nodes.some((element) => element.contains(target));

    if (!shouldSkipHandler) handler();
  });

  useOnDocument("mousedown", eventHandler);
  useOnDocument("touchstart", eventHandler);

  return setRef;
};

export default useClickOutside;
