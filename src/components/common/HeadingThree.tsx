// import { Skeleton } from "@/components/ui/skeleton";
import { HeadingThreeProps } from "@/lib/types";

const headingVariants = {
  default: "text-heading",
  primary: "text-background",
  secondary: "text-subheading",
};

const headingSize = {
  default: "text-xl font-semibold",
  sm: "text-xl font-medium",
  lg: "text-2xl font-semibold",
  xl: "text-4xl font-bold leading-leadingH2",
};

function HeadingThree({
  text,
  variant,
  size,
  className,
}: HeadingThreeProps & { className?: string }) {
  const variantClass = variant
    ? headingVariants[variant]
    : headingVariants.default;
  const sizeClass = size ? headingSize[size] : headingSize.default;

  return (
    <>
      {text ? (
        <h3 className={`${variantClass} ${sizeClass} ${className}`}>{text}</h3>
      ) : (
        ""
        // <Skeleton className="w-24 h-16" />
      )}
    </>
  );
}

export default HeadingThree;
