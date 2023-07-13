import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./product-section.scss?inline";
import { Slider } from "../slider/slider";
import { data } from "~/constants";
import { useSliderProvider } from "~/context/slider-context";
import { Modal } from "../modal/modal";
import { ProductInfo } from "./product-info";

export const ProductSection = component$(() => {
  useStylesScoped$(styles);

  const { productImages, productInfo } = data[0];
  useSliderProvider(productImages);

  return (
    <>
      <main class="main">
        <section class="section">
          <Slider design="mobile" />
          <ProductInfo
            {...productInfo}
            thumbnail={productImages[0].thumbnail}
          />
        </section>
      </main>
      <Modal />
    </>
  );
});
