import React from "react";
import { allPageURL } from "@/lib/config";
import { openNewTab } from "@/lib/utils";
import useWords from "@/hooks/useWords";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { WordItem } from "@/components/WordItem";
import { EmptyState } from "./EmptyState";

const Popup: React.FC = () => {
  const maxWords = 8;

  const { words, handleDelete, handleRemember, handleDeleteAll, handleAdd } =
    useWords();

  return (
    <div className="mx-auto w-[320px] space-y-4 p-4">
      <Header
        title="Latest words"
        onDeleteAll={handleDeleteAll}
        onAdd={handleAdd}
      />
      <div className="min-h-[380px] space-y-4">
        {!words.length ? (
          <p className="mt-36 text-center">
            <EmptyState />
          </p>
        ) : (
          <>
            <div className="flex flex-col space-y-2">
              {words.slice(0, maxWords).map((word, index) => (
                <WordItem
                  key={index}
                  word={word}
                  onRemember={handleRemember}
                  onDelete={handleDelete}
                  isHidden={true}
                />
              ))}
            </div>
            {words.length > maxWords ? (
              <Button
                onClick={() => openNewTab(allPageURL)}
                variant={"secondary"}
                className="w-full"
              >
                View all words
              </Button>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default Popup;
