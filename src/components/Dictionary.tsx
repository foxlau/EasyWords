import { DictionaryEntry } from "@/types";
import { Badge } from "./ui/badge";

const Dictionary: React.FC<{ dictionary: DictionaryEntry[] }> = ({
  dictionary,
}) => (
  <>
    {dictionary.length > 0 && (
      <ul className="space-y-2">
        {dictionary.map((item, index) =>
          Object.entries(item).map(([type, dictionary]) => (
            <li key={`${index}-${type}`}>
              <Badge
                variant="secondary"
                className="mr-1 font-mono font-medium text-muted-foreground"
              >
                {type}
              </Badge>
              <span>{dictionary}</span>
            </li>
          )),
        )}
      </ul>
    )}
  </>
);

export default Dictionary;
