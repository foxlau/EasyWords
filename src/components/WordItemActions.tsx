import { useState } from "react";
import { ActionsProps, Word } from "@/types";
import {
  EllipsisVerticalIcon,
  HeartIcon,
  HeartOffIcon,
  Trash2Icon,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export const WordItemActions: React.FC<
  {
    word: Word;
  } & Pick<ActionsProps, "onRemember" | "onDelete">
> = ({ word, onRemember, onDelete }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <div className="absolute -right-2 flex items-center space-x-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onRemember(word.word)}
          >
            {!word.remembered ? (
              <>
                <span className="sr-only">Remembered</span>
                <HeartIcon size={14} className="opacity-60" />
              </>
            ) : (
              <>
                <span className="sr-only">Unremembered</span>
                <HeartOffIcon size={14} className="text-destructive" />
              </>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {!word.remembered ? "Remembered" : "Unremembered"}
        </TooltipContent>
      </Tooltip>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <span className="sr-only">Actions</span>
            <EllipsisVerticalIcon className="h-4 w-4 opacity-60" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="text-red-600"
          >
            <Trash2Icon size="14" className="mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="max-w-sm"
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              After the word <b className="font-medium">“{word.word}”</b> is
              deleted, it cannot be recovered.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => {
                setShowDeleteDialog(false);
                onDelete(word.word);
              }}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
