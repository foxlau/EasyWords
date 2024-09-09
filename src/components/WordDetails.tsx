import { Fragment } from "react/jsx-runtime";
import { Word } from "@/types";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TranslationList from "./Dictionary";
import { Phonetic } from "./Phonetic";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export const WordDetails: React.FC<{
  word: Word;
  isHidden?: boolean;
}> = ({ word, isHidden }) => {
  const dictionaryLinks = [
    {
      name: "Cambridge",
      url: `https://dictionary.cambridge.org/zhs/%E8%AF%8D%E5%85%B8/%E8%8B%B1%E8%AF%AD-%E6%B1%89%E8%AF%AD-%E7%B9%81%E4%BD%93/${word.word}`,
      icon: "/images/cambridge.ico",
    },
    {
      name: "Bing",
      url: `https://cn.bing.com/dict/search?q=${word.word}&FORM=BDVSP6&cc=cn`,
      icon: "/images/bing.png",
    },
    {
      name: "Youdao",
      url: `https://www.youdao.com/result?word=${word.word}&lang=en`,
      icon: "/images/youdao.ico",
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className={cn(
            "h-auto p-0 text-base font-bold text-primary",
            isHidden && "text-sm",
          )}
        >
          {word.word}
        </Button>
      </DialogTrigger>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader className="text-left">
          <DialogTitle className="text-2xl font-bold text-primary">
            {word.word}
          </DialogTitle>

          <DialogDescription>
            {word.tip && (
              <p className="mt-2 inline-flex rounded-md border border-yellow-200 bg-yellow-50 p-2 text-xs text-yellow-800">
                {word.tip}
              </p>
            )}

            <Phonetic phonetic={word.phonetic} />
          </DialogDescription>
        </DialogHeader>

        <TranslationList dictionary={word.dictionary} />

        <div className="flex flex-col space-y-2">
          {word.example?.length ? (
            <p>
              <strong className="mr-2 font-normal text-muted-foreground">
                Example:
              </strong>
              {word.example.map((item, index) =>
                Object.entries(item).map(([type, example]) => {
                  const boldedType = type.replace(
                    new RegExp(word.word, "gi"),
                    (match) =>
                      `<strong class="font-medium text-destructive">${match}</strong>`,
                  );
                  return (
                    <Fragment key={`${index}-${type}`}>
                      <span dangerouslySetInnerHTML={{ __html: boldedType }} />
                      <small className="ml-2">({example})</small>
                    </Fragment>
                  );
                }),
              )}
            </p>
          ) : null}

          <div className="flex items-center">
            <strong className="mr-2 font-normal text-muted-foreground">
              Dictionary:
            </strong>
            <div className="flex space-x-3">
              {dictionaryLinks.map((dict) => (
                <Tooltip key={dict.name}>
                  <TooltipTrigger asChild>
                    <a href={dict.url} target="_blank">
                      <img
                        src={dict.icon}
                        alt={dict.name}
                        width={16}
                        height={16}
                      />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>See on {dict.name}</TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
