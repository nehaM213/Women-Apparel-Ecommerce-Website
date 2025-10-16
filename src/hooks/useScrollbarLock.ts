"use client";

import { useEffect, useRef } from "react";

export const useScrollbarLock = (isLocked: boolean) => {
  const originalStyle = useRef<string>("");
  const originalPaddingRight = useRef<string>("");

  useEffect(() => {
    if (isLocked) {
      // Store original values
      originalStyle.current = document.body.style.overflow;
      originalPaddingRight.current = document.body.style.paddingRight;
      
      // Calculate scrollbar width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Apply lock
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      // Restore original values
      document.body.style.overflow = originalStyle.current;
      document.body.style.paddingRight = originalPaddingRight.current;
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = originalStyle.current;
      document.body.style.paddingRight = originalPaddingRight.current;
    };
  }, [isLocked]);
};
