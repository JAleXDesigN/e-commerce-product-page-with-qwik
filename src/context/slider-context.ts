import { useContext } from "@builder.io/qwik";
import {
  $,
  createContextId,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import { useMediaQuery } from "~/hooks/use-media-query";
import type {
  SliderContext,
  ImageInfo,
  NavigateAction,
  SliderStore,
} from "./types";
import type { MouseOrTouchEvent } from "./utils";
import { getClientX, getNextIndex } from "./utils";

export const Context = createContextId<SliderContext>("slider");

export const useSliderProvider = (images: ImageInfo[]) => {
  const store = useStore<SliderStore>({
    images,
    sliderRef: null,
    currentImageIndex: 0,
    dragStartX: null,
    isPreviewOpen: false,
  });

  const matches = useMediaQuery(
    "(max-width: 991px)",
    $(() => {
      if (store.isPreviewOpen) {
        store.isPreviewOpen = false;
      }
    })
  );

  const openPreview = $(() => {
    if (store.isPreviewOpen || (matches.value && !store.isPreviewOpen)) {
      return;
    }
    store.isPreviewOpen = true;
  });

  const closePreview = $(() => {
    store.isPreviewOpen = false;
  });

  const setSliderRef = $((node: Element) => {
    if (!node || store.sliderRef === node) return;
    store.sliderRef = node;
  });

  const navigateImage = $((action: NavigateAction) => {
    const currentIndex = images.findIndex(
      (image) => image === images[store.currentImageIndex]
    );
    const nextIndex = getNextIndex(action, currentIndex, images.length);
    store.currentImageIndex = nextIndex;
  });

  const selectImage = $((index: number) => {
    store.currentImageIndex = index;
  });

  const handleDragStart = $((event: MouseOrTouchEvent) => {
    if (event instanceof MouseEvent && event.button !== 0) return;
    const clientX = getClientX(event);
    store.dragStartX = clientX;
  });
  const handleDragEnd = $((event: MouseOrTouchEvent) => {
    const dragStartX = store.dragStartX;
    const container = store.sliderRef as HTMLElement;
    if (!container || !dragStartX) return;
    const clientX = getClientX(event);

    const containerWidth = container.offsetWidth;
    const twentyPercentWidth = containerWidth * 0.1;

    if (clientX > dragStartX + twentyPercentWidth) {
      navigateImage("prev");
    } else if (clientX < dragStartX - twentyPercentWidth) {
      navigateImage("next");
    } else if (clientX === dragStartX) {
      openPreview();
    }

    store.dragStartX = null;
  });

  useContextProvider(Context, {
    store,
    setSliderRef,
    navigateImage,
    selectImage,
    handleDragStart,
    handleDragEnd,
    openPreview,
    closePreview,
  });
};

export const useSliderContext = () => useContext(Context);
