import { Volume2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const playAudio = (url: string) => {
  const audio = new Audio(url);
  audio.play().catch((error) => {
    console.error("Error playing audio:", error);
    const utterance = new SpeechSynthesisUtterance(url);
    speechSynthesis.speak(utterance);
  });
};

export const WordSpeak: React.FC<{
  word: string;
  audioUrl: string | null;
  className?: string;
}> = ({ word, audioUrl, className }) => {
  if (!audioUrl) {
    return;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={() => playAudio(audioUrl)}
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
