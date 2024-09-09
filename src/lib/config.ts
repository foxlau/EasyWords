import { Word } from "@/types";

export const extensionName = "EasyWords";

export const allPageURL = chrome.runtime.getURL("pages/all.html");

export const bingDictUrl = (word: string) =>
  `https://cn.bing.com/dict/search?q=${encodeURIComponent(
    word,
  )}&FORM=BDVSP6&cc=cn`;

export const defaultNewWord: Word = {
  word: "",
  tip: "",
  phonetic: [],
  dictionary: [],
  example: [],
  remembered: false,
  addedAt: new Date().toISOString(),
};

export function notification(message: string) {
  return chrome.notifications.create({
    type: "basic",
    iconUrl: "/images/icon48.png",
    title: "EasyWords",
    message: message,
  });
}
