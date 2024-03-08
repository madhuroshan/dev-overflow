"use client";
import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
interface CustomInputProps {
  route: string;
  iconPostion: string;
  imgSrc: string;
  placeholder: string;
  className?: string;
}

const LocalSearchBar = ({
  route,
  iconPostion,
  imgSrc,
  placeholder,
  className,
}: CustomInputProps) => {
  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-md px-4 ${className}`}
    >
      {iconPostion === "left" && (
        <Image
          src={imgSrc}
          alt="search"
          width={24}
          height={24}
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value=""
        onChange={() => {}}
        className="paragraph-regular no-focus placeholder background-light800_darkgradient 
        border-none shadow-none outline-none"
      />
      {iconPostion === "right" && (
        <Image
          src={imgSrc}
          alt="search"
          width={24}
          height={24}
        />
      )}
    </div>
  );
};

export default LocalSearchBar;
