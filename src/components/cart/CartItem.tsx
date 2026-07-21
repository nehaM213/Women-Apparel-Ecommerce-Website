"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineTrash } from "react-icons/hi";
import { CART_CONSTANTS, ARIA_LABELS } from "./constants";

interface CartItemProps {
  item: {
    id: string;
    title: string;
    price: number;
    quantity: number;
    images: string[];
    type: string;
    collectionType: string;
    slug: string;
  };
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  summary?: boolean;
}

const CartItem: React.FC<CartItemProps> = React.memo(
  ({ item, onUpdateQuantity, onRemoveItem, summary }) => {
    const handleQuantityChange = React.useCallback(
      (newQuantity: number) => {
        if (!onUpdateQuantity) return; // ✅ prevents undefined call
        if (newQuantity >= 1) {
          onUpdateQuantity(item.id, newQuantity);
        }
      },
      [item.id, onUpdateQuantity]
    );

    const handleRemove = React.useCallback(() => {
      if (!onRemoveItem) return; // ✅ prevents undefined call
      onRemoveItem(item.id);
    }, [item.id, onRemoveItem]);

    return (
      <div className="bg-white rounded-md border p-3">
        <div className="flex items-start gap-3">
          {/* Product Image */}
          <div
            className={`relative ${CART_CONSTANTS.IMAGE_SIZE.CLASSES} flex-shrink-0`}
          >
            <Image
              src={item.images[0]}
              alt={item.title}
              fill
              sizes="72px"
              loading="lazy"
              placeholder="blur"
              blurDataURL="/blur-placeholder.webp"
              className="rounded-md object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <Link
              href={`/${item.type}/collection/${item.collectionType}/${item.slug}`}
              className="no-underline"
            >
              <h3 className="text-sm font-medium truncate max-w-[12rem]">
                {item.title}
              </h3>
              <p className="text-xs text-muted-foreground">₹{item.price}</p>
            </Link>

            {/* Quantity and Remove Buttons */}
            {/* Quantity and Remove (Cart Mode) */}
            {!summary && (
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <button
                    className={`${CART_CONSTANTS.BUTTON_CLASSES.QUANTITY.BASE} ${CART_CONSTANTS.BUTTON_CLASSES.QUANTITY.LEFT}`}
                    onClick={() => handleQuantityChange(item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>

                  <span className="mx-2 text-sm w-6 text-center">
                    {item.quantity}
                  </span>

                  <button
                    className={`${CART_CONSTANTS.BUTTON_CLASSES.QUANTITY.BASE} ${CART_CONSTANTS.BUTTON_CLASSES.QUANTITY.RIGHT}`}
                    onClick={() => handleQuantityChange(item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  className={CART_CONSTANTS.BUTTON_CLASSES.REMOVE}
                  onClick={handleRemove}
                >
                  <HiOutlineTrash className="w-5 h-5" />
                </button>
              </div>
            )}
            {/* Summary Mode (No buttons, only display) */}
            {summary && (
              <div className="mt-2 text-sm text-muted-foreground">
                Qty: {item.quantity} &nbsp; | &nbsp;
                <span className="font-medium text-gray-900">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

CartItem.displayName = "CartItem";

export default CartItem;
