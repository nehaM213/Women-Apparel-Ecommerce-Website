import * as React from "react"
import { CiSearch } from "react-icons/ci";
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    iconName?: string;
  }

  const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, iconName, ...props }, ref) => {
      const iconMap: { [key: string]: React.ElementType } = {
        CiSearch,
      };
      const IconComponent = iconName ? iconMap[iconName] : undefined;
  
      return (
        <div className="relative">
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 pr-10 py-2 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none",
              className
            )}
            ref={ref}
            {...props}
          />
          {IconComponent && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <IconComponent className="w-5 h-5 text-gray-500" />
            </div>
          )}
        </div>
      );
    }
  );
Input.displayName = "Input"

export { Input }
