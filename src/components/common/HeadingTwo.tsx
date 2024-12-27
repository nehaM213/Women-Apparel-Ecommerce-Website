// import { Skeleton } from "@/components/ui/skeleton";
import { v4 as uuidv4 } from "uuid";
function HeadingTwo({
  text,
  className
}: {
  text: string;
  className?: string;
}) {
  return (
    <>
        <h2
          className={`md:text-4xl text-3xl font-bold leading-leadingH2 ${className}`}
        >
          {text}
        </h2>
    </>
  );
}

export default HeadingTwo;
