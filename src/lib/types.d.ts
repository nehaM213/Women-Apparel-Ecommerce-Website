export type NavItemPropsType = {
    name: string;
    items: string[];
}
export interface ReviewData {
  name: string;
  comment: string;
  shortComment: string;
  rating: number;
  imgSrc: string;
}
export interface ParagrpahProps {
  text: string;
  variant?: "default" | "primary" | "secondary" | "tertiary";
  size?: "default" | "sm" | "md" | "lg" | "xl" | "xxl";
  className?: string;
}
export interface HeadingThreeProps {
  text: string;
  variant?: "default" | "primary" | "secondary";
  size?: "default" | "sm" | "lg" | "xl";
}