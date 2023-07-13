import type { QRL } from "@builder.io/qwik";
import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./slider.scss?inline";
import { Control } from "./control";
import { Thumbnail } from "./thumbnail";
import { useSliderContext } from "~/context/slider-context";
import { ActionButton } from "../buttons/action-button";

export interface SliderProps {
  design: "mobile" | "modal";
  handleClose?: QRL<() => void>;
}

export const Slider = component$<SliderProps>(({ design, handleClose }) => {
  useStylesScoped$(styles);
  const {
    store: { images, currentImageIndex },
    setSliderRef,
    navigateImage,
    selectImage,
    handleDragStart,
    handleDragEnd,
  } = useSliderContext();

  return (
    <div class="container">
      {design === "modal" && (
        <ActionButton
          action="close"
          size="small"
          color="light"
          onClick$={handleClose}
        />
      )}

      <Control
        type="prev"
        design={design}
        onClick$={() => navigateImage("prev")}
      />
      <Control
        type="next"
        design={design}
        onClick$={() => navigateImage("next")}
      />

      <div class="slider-main-images">
        <div
          ref={setSliderRef}
          class={["main-images-group", `slide-${currentImageIndex}`]}
          onMouseDown$={handleDragStart}
          onTouchStart$={handleDragStart}
          onMouseUp$={handleDragEnd}
          onTouchEnd$={handleDragEnd}
        >
          {images.map(({ src, title }) => (
            <img
              key={title}
              src={src}
              alt={title}
              width={600}
              height={600}
            />
          ))}
        </div>
      </div>

      <div class="thumbnails-group">
        {images.map(({ title, thumbnail }, index) => (
          <Thumbnail
            key={title}
            forModal={design === "modal"}
            title={title}
            thumbnail={thumbnail}
            active={title === images[currentImageIndex].title}
            onClick$={() => selectImage(index)}
          />
        ))}
      </div>
    </div>
  );
});
