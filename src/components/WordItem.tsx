import React from "react";
import { ActionsProps, Word } from "@/types";
import { cn, getFirstObjectValue } from "@/lib/utils";
import Dictionary from "./Dictionary";
import { WordDetails } from "./WordDetails";
import { WordItemActions } from "./WordItemActions";
import { WordSpeak } from "./WordSpeak";

export const WordItem: React.FC<
  { word: Word; isHidden?: boolean } & Pick<
    ActionsProps,
    "onRemember" | "onDelete"
  >
> = ({ word, onRemember, onDelete, isHidden }) => {
  return (
    <div
      className={cn(
        "flex flex-col space-y-2 rounded-lg border shadow-sm",
        isHidden ? "p-3" : "p-4",
      )}
    >
      <div className="relative flex items-center">
        <div className="relative flex items-center">
          <WordDetails word={word} isHidden={isHidden} />
          <WordSpeak
            word={word.word}
            audioUrl={getFirstObjectValue(word.phonetic)}
            className="absolute -right-9 opacity-60"
          />
        </div>
        <WordItemActions
          word={word}
          onRemember={onRemember}
          onDelete={onDelete}
        />
      </div>
      {!isHidden && <Dictionary dictionary={word.dictionary} />}
    </div>
  );
};
