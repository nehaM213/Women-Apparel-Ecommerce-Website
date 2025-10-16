// Optimized cart utilities for better performance

export const CART_ANIMATIONS = {
  // Use CSS transforms instead of changing layout properties
  drawer: {
    enter: 'transform transition-transform duration-300 ease-out',
    enterFrom: 'translate-x-full',
    enterTo: 'translate-x-0',
    leave: 'transform transition-transform duration-200 ease-in',
    leaveFrom: 'translate-x-0',
    leaveTo: 'translate-x-full',
  },
  backdrop: {
    enter: 'transition-opacity duration-300 ease-out',
    enterFrom: 'opacity-0',
    enterTo: 'opacity-100',
    leave: 'transition-opacity duration-200 ease-in',
    leaveFrom: 'opacity-100',
    leaveTo: 'opacity-0',
  }
} as const;

export const SCROLLBAR_PREVENTION = {
  // Modern CSS approach
  modern: 'scrollbar-gutter: stable',
  
  // Fallback for older browsers
  fallback: `
    body {
      overflow-x: hidden;
      padding-right: 0;
    }
  `,
  
  // JavaScript approach (if needed)
  js: (isOpen: boolean) => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';
    }
  }
} as const;

// Debounced scroll handler for better performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
