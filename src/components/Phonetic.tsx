import { Word } from "@/types";
import { WordSpeak } from "./WordSpeak";

export const Phonetic: React.FC<{
  phonetic: Word["phonetic"];
}> = ({ phonetic }) => {
  return (
    <div className="mt-2 flex flex-col sm:flex-row sm:space-x-2">
      {phonetic.map((item, index) => {
        const [key, value] = Object.entries(item)[0];
        return (
          <div key={index} className="flex flex-row flex-nowrap items-center">
            <strong className="font-semibold">{key}</strong>
            <WordSpeak word={key} audioUrl={value} />
          </div>
        );
      })}
    </div>
  );
};
