// Cart component constants
export const CART_CONSTANTS = {
  IMAGE_SIZE: {
    WIDTH: 72,
    HEIGHT: 90,
    CLASSES: "w-[72px] h-[90px]",
  },
  BUTTON_CLASSES: {
    QUANTITY: {
      BASE: "bg-gray-200 text-gray-700 px-2 py-1",
      LEFT: "rounded-l",
      RIGHT: "rounded-r",
    },
    REMOVE: "text-red-500 hover:text-red-700",
    CHECKOUT: "w-full",
  },
  DRAWER_CLASSES: {
    CONTENT: "right-0 left-auto w-full max-w-full sm:w-[90vw] md:w-[28rem] lg:w-[32rem] xl:w-[36rem] shadow-xl",
  },
} as const;

export const ARIA_LABELS = {
  CART_ITEMS: "Cart items",
  CART_ITEMS_LIST: "Cart items list",
  CLOSE_CART: "Close cart",
  DECREASE_QUANTITY: (title: string) => `Decrease quantity of ${title}`,
  INCREASE_QUANTITY: (title: string) => `Increase quantity of ${title}`,
  REMOVE_ITEM: (title: string) => `Remove ${title} from cart`,
} as const;
