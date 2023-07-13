import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { ProductSection } from "~/components/product-section/product-section";

export default component$(() => {
  return <ProductSection />;
});

export const head: DocumentHead = {
  title: "E-commerce Product Page",
  meta: [
    {
      name: "description",
      content:
        "Challenge E-commerce Product Page of FrontEnd Mentor, made with Qwik Framework by Jonathan Holguin.",
    },
  ],
};
