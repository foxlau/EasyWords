import { Volume2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const playAudio = (url: string) => {
  const audio = new Audio(url);
  audio.play().catch((error) => {
    console.error("Error playing audio:", error);
  });
};

export const WordSpeak: React.FC<{
  word: string;
  audioUrl: string | null;
  className?: string;
}> = ({ word, audioUrl, className }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={() => {
            if (audioUrl) {
              playAudio(audioUrl);
            } else {
              const utterance = new SpeechSynthesisUtterance(word);
              speechSynthesis.speak(utterance);
            }
          }}
          aria-label={`Play ${word} pronunciation`}
          variant="ghost"
          size="icon"
          className={cn("h-8 w-8", className)}
        >
          <Volume2Icon size={14} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Click to listen</TooltipContent>
    </Tooltip>
  );
};
