import { $ } from "@builder.io/qwik";

const TABBABLE_NODES = /input|select|textarea|button|object/;
export const FOCUS_SELECTOR =
  "a, input, select, textarea, button, object, [tabindex]";

const visible = (element: HTMLElement) => {
  const isHidden =
    element.getAttribute("aria-hidden") === "true" ||
    element.getAttribute("hidden") !== null ||
    element.getAttribute("type") === "hidden";

  if (isHidden) return false;

  let parentElement: HTMLElement | null = element.parentElement;
  while (parentElement && parentElement !== document.body) {
    if (parentElement.style.display === "none") return false;
    parentElement = parentElement.parentElement;
  }

  return true;
};

const isFocusable = $((element: HTMLElement) => {
  const nodeName = element.nodeName.toLowerCase();
  const tabIndex = element.getAttribute("tabindex");
  const isTabIndexNotNaN = tabIndex !== null && !Number.isNaN(Number(tabIndex));

  return (
    ((TABBABLE_NODES.test(nodeName) && !(element as any).disabled) ||
      ((element instanceof HTMLButtonElement ||
        element instanceof HTMLInputElement ||
        element instanceof HTMLSelectElement) &&
        isTabIndexNotNaN) ||
      (isTabIndexNotNaN && Number(tabIndex) >= 0)) &&
    visible(element)
  );
});

export default isFocusable;
