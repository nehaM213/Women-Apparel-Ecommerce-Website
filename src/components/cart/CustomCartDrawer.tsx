"use client";

import React from "react";
import { createPortal } from "react-dom";
import { useScrollbarLock } from "@/hooks/useScrollbarLock";

interface CustomCartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const CustomCartDrawer: React.FC<CustomCartDrawerProps> = ({ 
  open, 
  onOpenChange, 
  children 
}) => {
  useScrollbarLock(open);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Drawer Content */}
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        {children}
      </div>
    </div>,
    document.body
  );
};

export default CustomCartDrawer;
