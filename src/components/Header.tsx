import { ActionsProps } from "@/types";
import HeadActions from "./HeadActions";
import { Badge } from "./ui/badge";

export const Header: React.FC<
  {
    title: string;
    count?: number;
  } & Pick<ActionsProps, "onDeleteAll" | "onAdd">
> = ({ title, onDeleteAll, onAdd, count }) => {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <img
          src="/images/icon32.png"
          width={32}
          height={32}
          className="size-6 rounded"
        />
        <div className="flex items-center space-x-1">
          <h1 className="text-base font-bold">{title}</h1>
          {count ? <Badge variant={"secondary"}>{count}</Badge> : null}
        </div>
      </div>
      <div className="flex space-x-2">
        <HeadActions onAdd={onAdd} onDeleteAll={onDeleteAll} />
      </div>
    </header>
  );
};
