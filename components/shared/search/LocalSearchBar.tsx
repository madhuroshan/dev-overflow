"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: search,
        });

        router.push(newUrl, {
          scroll: false,
        });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keys: ["q"],
          });

          router.push(newUrl, {
            scroll: false,
          });
        }
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, route, pathname, router, searchParams, query]);

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-md px-4 ${className}`}
    >
      {iconPostion === "left" && (
        <Image src={imgSrc} alt="search" width={24} height={24} />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className="paragraph-regular no-focus placeholder text-dark400_light700 bg-transparent 
        border-none shadow-none outline-none"
      />
      {iconPostion === "right" && (
        <Image src={imgSrc} alt="search" width={24} height={24} />
      )}
    </div>
  );
};

export default LocalSearchBar;
