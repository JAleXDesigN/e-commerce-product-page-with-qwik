import type { Signal } from "@builder.io/qwik";

type Nodes = Signal<Element | undefined> | Element;

export const setCloseAttribute = (...nodes: Nodes[]) => {
  if (nodes.length === 0) return;
  nodes.forEach((node) => {
    const element = "value" in node ? node.value : node;
    element?.setAttribute("data-closing", "true");
  });
};
