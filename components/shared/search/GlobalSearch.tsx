"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import GlobalResult from "../GlobalResult";

const GlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchContainerRef = useRef(null);

  const query = searchParams.get("q");

  const [search, setSearch] = useState(query || "");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (
        searchContainerRef.current &&
        // @ts-ignore
        !searchContainerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };

    setIsOpen(false);

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [pathname]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "global",
          value: search,
        });

        router.push(newUrl, {
          scroll: false,
        });
      } else {
        if (!query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keys: ["global", "type"],
          });

          router.push(newUrl, {
            scroll: false,
          });
        }
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, pathname, router, searchParams, query]);
  return (
    <div
      className="relative w-full max-w-[600px] max-lg:hidden"
      ref={searchContainerRef}
    >
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4 py-2">
        <Image
          src="/assets/icons/search.svg"
          height={24}
          width={24}
          alt="search"
          className="cursor-pointer"
        />
        <Input
          placeholder="Search for questions"
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) {
              setIsOpen(true);
            }

            if (e.target.value === "" && isOpen) {
              setIsOpen(false);
            }
          }}
          className="paragraph-regular bg-transparent text-dark400_light700 no-focus placeholder background-light800_darkgradient text-dark400_light700 border-none shadow-none outline-none"
        />
      </div>
      {isOpen && <GlobalResult />}
    </div>
  );
};

export default GlobalSearch;
