import { useEffect, useState } from "react";
import { Word } from "@/types";
import { bingDictUrl, defaultNewWord, notification } from "@/lib/config";
import { parseHtml } from "@/lib/parseHtml";
import { validateWord } from "@/lib/utils";

const useWords = () => {
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    if (chrome && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get({ words: [] }, (result) => {
        setWords(result.words as Word[]);
      });
    }
  }, []);

  const handleDelete = (wordToDelete: string) => {
    if (!wordToDelete.length) return;
    const updatedWords = words.filter((word) => word.word !== wordToDelete);
    setWords(updatedWords);
    chrome.storage.local.set({ words: updatedWords });
  };

  const handleDeleteAll = () => {
    setWords([]);
    chrome.storage.local.set({ words: [] });
  };

  const handleRemember = (wordToRemember: string) => {
    const updatedWords = words.map(
      (word) =>
        word.word === wordToRemember
          ? { ...word, remembered: !word.remembered }
          : word, // Toggle remembered state
    );
    setWords(updatedWords);
    chrome.storage.local.set({ words: updatedWords });
  };

  const handleAdd = async (word: string): Promise<boolean> => {
    if (!validateWord(word)) {
      notification("Please enter an English word.");
      return false;
    }

    try {
      const data = await new Promise<{ words: Word[] }>((resolve) =>
        chrome.storage.local.get({ words: [] }, (items) =>
          resolve(items as { words: Word[] }),
        ),
      );
      const storedWords = data.words;

      const existingWord = storedWords.find(
        (w) => w.word.toLowerCase() === word,
      );

      if (existingWord) {
        notification(`The word "${word}" already exists.`);
        return false;
      }

      let newWord: Word = {
        ...defaultNewWord,
        word: word,
      };

      const response = await fetch(bingDictUrl(word));
      const html = await response.text();
      newWord = parseHtml(newWord, html);

      if (!newWord.dictionary.length && !newWord.phonetic.length) {
        notification(`No related words found for "${newWord.word}"`);
        return false;
      }

      // Check again if it exists (in case it was added while fetching)
      const existingWordAfterFetch = storedWords.find(
        (w) => w.word.toLowerCase() === newWord.word.toLowerCase(),
      );
      if (existingWordAfterFetch) {
        notification(`The word "${newWord.word}" already exists.`);
        return false;
      }

      setWords((prevWords) => [newWord, ...prevWords]);

      // Update chrome.storage
      const updatedWords = [
        newWord,
        ...storedWords.filter(
          (w) => w.word.toLowerCase() !== newWord.word.toLowerCase(),
        ),
      ];
      await new Promise<void>((resolve) =>
        chrome.storage.local.set({ words: updatedWords }, () => resolve()),
      );

      notification(`The word "${newWord.word}" was added successfully.`);
      return true;
    } catch (error) {
      console.error("Error in handleAdd:", error);
      notification(`Failed to add the word "${word}".`);
      return false;
    }
  };

  const handleEdit = (word: string, editedWord: string) => {
    console.log("word", word);
    console.log("editedWord", editedWord);
  };

  return {
    words,
    handleRemember,
    handleDelete,
    handleDeleteAll,
    handleAdd,
    handleEdit,
  };
};

export default useWords;
