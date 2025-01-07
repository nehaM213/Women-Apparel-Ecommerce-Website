import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistState {
  wishlist: string[];
  addToWishlist: (item: string) => void;
  removeFromWishlist: (item: string) => void;
}

export const wishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      wishlist: [],
      addToWishlist: (item: string) =>
        set((state) => ({
          wishlist: [...state.wishlist, item],
        })),
      removeFromWishlist: (item: string) =>
        set((state) => ({
          wishlist: state.wishlist.filter((i) => i !== item),
        })),
    }),
    {
      name: 'wishlist-storage', // Name of the storage key in localStorage or sessionStorage
    }
  )
);
