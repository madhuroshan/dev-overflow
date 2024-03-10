import { type ClassValue, clsx } from "clsx";
import { Number } from "mongoose";
import qs from "query-string";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeStamp = (createdAt: Date): string => {
  const now = new Date();
  const diffInMilliseconds = now.getTime() - createdAt.getTime();

  // Define time intervals in milliseconds
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30; // Roughly 30 days in a month
  const year = day * 365; // Roughly 365 days in a year

  if (diffInMilliseconds < minute) {
    return `${Math.round(diffInMilliseconds / 1000)} seconds ago`;
  } else if (diffInMilliseconds < hour) {
    return `${Math.round(diffInMilliseconds / minute)} minutes ago`;
  } else if (diffInMilliseconds < day) {
    return `${Math.round(diffInMilliseconds / hour)} hours ago`;
  } else if (diffInMilliseconds < week) {
    return `${Math.round(diffInMilliseconds / day)} days ago`;
  } else if (diffInMilliseconds < month) {
    return `${Math.round(diffInMilliseconds / week)} weeks ago`;
  } else if (diffInMilliseconds < year) {
    const monthsAgo = Math.round(diffInMilliseconds / month);
    return `${monthsAgo} ${monthsAgo === 1 ? "month" : "months"} ago`;
  } else {
    const yearsAgo = Math.round(diffInMilliseconds / year);
    return `${yearsAgo} ${yearsAgo === 1 ? "year" : "years"} ago`;
  }
};

export function formatNumber(num: number): string {
  if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + "M";
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "k";
  } else {
    return num.toString();
  }
}

export function getJoinedDate(date: Date) {
  // Array of month names
  // Extract month and year from the Date object
  const month = date?.toLocaleString("default", { month: "long" });
  const year = date?.getFullYear();

  // Join month and year with a space in between
  const joinDate = `${month} ${year}`;
  return joinDate;
}

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    {
      skipNull: true,
    }
  );
};

interface UrlRemoveQueryParams {
  params: string;
  keys: string[];
}

export const removeKeysFromQuery = ({ params, keys }: UrlRemoveQueryParams) => {
  const currentUrl = qs.parse(params);

  keys.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    {
      skipNull: true,
    }
  );
};
