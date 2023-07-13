//Cart Context
/**Store of Cart Context */
export interface CartStore {
  items: ItemInfo[];
  total: number;
}

/**Card Context*/
export interface CartContext {
  store: CartStore;
  addItem: QRL<(params: ItemParams) => void>;
  removeItem: QRL<(id: string) => void>;
}

export interface ItemInfo extends ItemParams {
  total: number;
}

export interface ItemParams {
  id: string;
  image: string;
  name: string;
  priceNormal: number;
  priceWithDiscount: number;
  discountPercent: number;
  quantity: number;
}

//Slider Context
/**Info required for slider images */
export interface ImageInfo {
  title: string;
  src: string;
  thumbnail: string;
}

/**Store of Slider Context */
export interface SliderStore {
  images: ImageInfo[];
  sliderRef: Element | null;
  currentImageIndex: number;
  dragStartX: number | null;
  isPreviewOpen: boolean;
}

export interface SliderContext {
  store: SliderStore;
  setSliderRef: QRL<(node: Element) => void>;
  navigateImage: QRL<(action: NavigateAction) => void>;
  selectImage: QRL<(index: number) => void>;
  handleDragStart: QRL<(event: MouseOrTouchEvent) => void>;
  handleDragEnd: QRL<(event: MouseOrTouchEvent) => void>;
  openPreview: QRL<() => void>;
  closePreview: QRL<() => void>;
}

type NavigateAction = "prev" | "next";
