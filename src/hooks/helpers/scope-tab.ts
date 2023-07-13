import isFocusable, { FOCUS_SELECTOR } from "./is-focusable";

const scopeTab = (event: KeyboardEvent, node: Element) => {
  if (event.key !== "Tab") return;

  const tabbable = Array.from(
    node.querySelectorAll<HTMLElement>(FOCUS_SELECTOR)
  ).filter(isFocusable);

  if (!tabbable.length) {
    event.preventDefault();
    return;
  }
  const finalTabbable = tabbable[event.shiftKey ? 0 : tabbable.length - 1];
  const root = node.getRootNode() as unknown as DocumentOrShadowRoot;
  const leavingFinalTabbable =
    finalTabbable === root.activeElement || node === root.activeElement;

  if (!leavingFinalTabbable) {
    return;
  }

  event.preventDefault();

  const target = tabbable[event.shiftKey ? tabbable.length - 1 : 0];

  if (target) {
    target.focus();
  }
};

export default scopeTab;
