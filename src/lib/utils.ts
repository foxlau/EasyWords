import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const wait = (time = 100) =>
  new Promise((resolve) => setTimeout(resolve, time));

export const validateWord = (word: string): boolean => {
  const trimmedWord = word.trim().split(/\s+/)[0].toLowerCase();
  return /^[a-zA-Z]+$/.test(trimmedWord);
};

export function getFirstObjectValue(
  arr: Record<string, string>[],
): string | null {
  if (arr.length === 0 || typeof arr[0] !== "object") {
    return null;
  }

  const firstObject = arr[0];
  const key = Object.keys(firstObject)[0];
  return firstObject[key];
}

export function decodeHTMLEntities(text: string): string {
  const entities: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&#x2F;": "/",
    "&#x60;": "`",
    "&#x3D;": "=",
    "&#160;": " ",
    "&#230;": "æ",
  };
  return text.replace(
    /&(amp|lt|gt|quot|#39|#x2F|#x60|#x3D|#160|#230);/g,
    function (match, entity): string {
      return entities["&" + entity + ";"] ?? match;
    },
  );
}

export const openNewTab = (url: string) => {
  if (chrome && chrome.tabs && chrome.runtime) {
    chrome.tabs.create({ url });
  } else {
    console.error("chrome.tabs or chrome.runtime is not available");
  }
};
