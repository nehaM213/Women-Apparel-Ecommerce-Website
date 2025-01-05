import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  width?: number;
  height?: number;
  linkClass?: string;
  imageClass?: string;
}

export const Logo: React.FC<LogoProps> = ({
  width = 150,
  height = 50,
  linkClass = "no-underline",
  imageClass = "",
}) => (
  <Link href="/" className={`no-underline ${linkClass}`}>
    <Image
      width={width}
      height={height}
      priority
      alt="Brand Logo"
      src="/logo.png"
      className={imageClass}
    />
  </Link>
);
