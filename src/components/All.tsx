import React from "react";
import useWords from "@/hooks/useWords";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WordItem } from "@/components/WordItem";
import { EmptyState } from "./EmptyState";
import { Header } from "./Header";

const All: React.FC = () => {
  const { words, handleRemember, handleDeleteAll, handleDelete, handleAdd } =
    useWords();

  return (
    <div className="mx-auto max-w-screen-sm space-y-4 p-4 md:p-8">
      <Header
        title="All Words"
        onDeleteAll={handleDeleteAll}
        onAdd={handleAdd}
        count={words.length}
      />
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="remembered">Remembered</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          {words.length ? (
            <div className="flex flex-col space-y-4">
              {words.map((word, index) => (
                <WordItem
                  key={index}
                  word={word}
                  onRemember={handleRemember}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <p className="px-14 pt-36 text-center">
              <EmptyState />
            </p>
          )}
        </TabsContent>
        <TabsContent value="remembered" className="mt-4">
          {words.filter((word) => word.remembered).length ? (
            <div className="flex flex-col space-y-4">
              {words
                .filter((word) => word.remembered)
                .map((word, index) => (
                  <WordItem
                    key={index}
                    word={word}
                    onRemember={handleRemember}
                    onDelete={handleDelete}
                  />
                ))}
            </div>
          ) : (
            <div className="px-14 pt-36 text-center">
              <b>
                <span className="text-6xl">😺</span>
                <br />
                What? You don't have <br />
                any memorized words yet?
              </b>
              <br />
              <span className="text-muted-foreground">
                You can click the ♡ in the word list to add words here.
              </span>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default All;
