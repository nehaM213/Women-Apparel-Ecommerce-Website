// import { Skeleton } from "@/components/ui/skeleton";
import { ParagrpahProps } from "@/lib/types";

import { v4 as uuidv4 } from "uuid";

const ParaVariant = {
  default: "text-heading",
  primary: "text-subheading",
  secondary: "text-label",
  tertiary: "text-background",
};

const sizeStyles = {
  default: "text-base leading-normal font-medium",
  sm: "text-sm font-medium leading-tight",
  md: "text-lg leading-7 font-normal",
  lg: "text-xl leading-leadingPara font-normal",
  xl: "text-lg font-semibold",
  xxl: "text-2xl font-semibold",
};
function Paragraph({ text, variant, size, className }: ParagrpahProps) {
  const variantClass = variant ? ParaVariant[variant] : ParaVariant.default;
  const sizeClass = size ? sizeStyles[size] : sizeStyles.default;
  const parts = text?.split(/(10% OFF)/);
  return (
    <>
      {text ? (
        <p className={`${variantClass} ${sizeClass} ${className}`}>
          {parts?.map((part, index) => {
            if (part === "10% OFF") {
              return (
                <span key={uuidv4()} className="text-action">
                  {part}
                </span>
              );
            } else {
              return <span key={uuidv4()}>{part}</span>;
            }
          })}
        </p>
      ) : (
        ""
        // <Skeleton className="w-1/2 h-4" />
      )}
    </>
  );
}

export default Paragraph;
