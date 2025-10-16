"use client";

import React from "react";

interface CSSOnlyCartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const CSSOnlyCartDrawer: React.FC<CSSOnlyCartDrawerProps> = ({ 
  open, 
  onOpenChange, 
  children 
}) => {
  return (
    <div 
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Drawer Content */}
      <div className={`
        absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl 
        transform transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {children}
      </div>
    </div>
  );
};

export default CSSOnlyCartDrawer;
