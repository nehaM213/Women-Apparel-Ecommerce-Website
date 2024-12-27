"use client";
import { EmblaCarouselType } from "embla-carousel";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type PropType = PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>;

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, disabled, ...restProps } = props;

  return (
    <button
      className={`items-center w-12 h-12 border-2 rounded-full ${disabled && "cursor-default"} hover:border-link hover:bg-violet`}
      type="button"
      {...restProps}
    >
      <FiArrowLeft className={`w-6 h-6 m-auto ${disabled && "text-gray"}`} />
      {children}
      {children}
    </button>
  );
};

export const NextButton: React.FC<PropType> = (props) => {
  const { children, disabled, ...restProps } = props;

  return (
    <button
      className={`items-center ml-3 w-12 h-12 border-2 rounded-full ${disabled && "cursor-default"} hover:border-link hover:bg-violet`}
      type="button"
      {...restProps}
    >
      {/* <svg
        className={`w-4 h-4 m-auto ${disabled && "text-gray"}`}
        viewBox="0 0 532 532"
      >
        <path
          fill="currentColor"
          d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
        />
      </svg> */}
      <FiArrowRight className={`w-6 h-6 m-auto ${disabled && "text-gray"}`} />
      {children}
    </button>
  );
};
