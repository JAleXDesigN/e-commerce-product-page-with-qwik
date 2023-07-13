import { useContext } from "@builder.io/qwik";
import {
  $,
  createContextId,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import type { CartContext, ItemInfo, ItemParams, CartStore } from "./types";

export const Context = createContextId<CartContext>("cart");

export const useCartProvider = () => {
  const store = useStore<CartStore>({
    items: [],
    total: 0,
  });

  const addItem = $((params: ItemParams) => {
    const { id, priceWithDiscount, quantity } = params;
    if (quantity === 0) return;

    const itemIndex = store.items.findIndex((item) => item.id === id);

    const updateItem = (item: ItemInfo) => ({
      ...item,
      quantity: item.quantity + quantity,
      total: priceWithDiscount * (item.quantity + quantity),
    });

    if (itemIndex !== -1) {
      const updatedItems = store.items.map((item, index) =>
        index === itemIndex ? updateItem(item) : item
      );
      store.items = updatedItems;
    } else {
      const newItem = {
        ...params,
        total: priceWithDiscount * quantity,
      };

      store.items = [...store.items, newItem];
    }
  });

  const removeItem = $((id: string) => {
    const update = store.items.filter((item) => item.id !== id);
    store.items = update;
  });

  useContextProvider(Context, { store, addItem, removeItem });
};

export const useCartContext = () => useContext(Context);
