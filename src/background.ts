import {
  allPageURL,
  bingDictUrl,
  defaultNewWord,
  extensionName,
  notification,
} from "./lib/config";
import { parseHtml } from "./lib/parseHtml";
import { validateWord } from "./lib/utils";
import { Word } from "./types";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "addWord",
    title: `Add "%s" to ${extensionName}`,
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(
  (info: chrome.contextMenus.OnClickData) => {
    if (info.menuItemId === "addWord" && info.selectionText) {
      if (!validateWord(info.selectionText)) {
        notification("Please select an English word.");
        return false;
      }

      const selectedText = info.selectionText;

      chrome.storage.local.get({ words: [] }, (data) => {
        const words = data.words;
        const existingWord = words.find(
          (word: Word) => word.word.toLowerCase() === selectedText,
        );
        if (existingWord) {
          return notification(`The word "${selectedText}" already exists.`);
        }

        const newWord: Word = {
          ...defaultNewWord,
          word: selectedText,
        };

        fetch(bingDictUrl(selectedText))
          .then((response) => response.text())
          .then((html) => {
            const parsedWord = parseHtml(newWord, html);
            Object.assign(newWord, parsedWord);

            if (!newWord.dictionary.length && !newWord.phonetic.length) {
              notification(`No related words found for "${selectedText}"`);
              return;
            }

            chrome.storage.local.get({ words: [] }, (data) => {
              const words = data.words;
              const existingIndex = words.findIndex(
                (word: Word) =>
                  word.word.toLowerCase() === newWord.word.toLowerCase(),
              );
              if (existingIndex !== -1) {
                notification(`The word "${newWord.word}" already exists.`);
                return;
              }
              words.unshift(newWord);
              chrome.storage.local.set({ words });
              notification(
                `The word "${newWord.word}" was added successfully.`,
              );
            });
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            return notification(`Failed to add the word "${selectedText}".`);
          });
      });
    }
  },
);

chrome.notifications.onClicked.addListener(() => {
  // Get all open tabs
  chrome.tabs.query({}, (tabs) => {
    // Check if there is already a tab with the target URL
    let found = false;
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].url === allPageURL) {
        // If the tab with the target URL already exists, activate and refresh it
        chrome.tabs.update(tabs[i].id!, { active: true }, () => {
          // Refresh the tab
          chrome.tabs.reload(tabs[i].id!);
        });
        found = true;
        break;
      }
    }
    // If no tab with the target URL is found, create a new tab
    if (!found) {
      chrome.tabs.create({ url: allPageURL });
    }
  });
});
