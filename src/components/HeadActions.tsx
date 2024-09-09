import * as React from "react";
import { useState } from "react";
import { ActionsProps } from "@/types";
import { Dialog } from "@radix-ui/react-dialog";
import {
  ExternalLinkIcon,
  MenuIcon,
  Monitor,
  Moon,
  PlusCircleIcon,
  Sun,
  Trash2Icon,
} from "lucide-react";
import { allPageURL } from "@/lib/config";
import { openNewTab, wait } from "@/lib/utils";
import { useTheme } from "./ThemeProvider";
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
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";

const HeadActions: React.FC<Pick<ActionsProps, "onDeleteAll" | "onAdd">> = ({
  onDeleteAll,
  onAdd,
}) => {
  const { setTheme } = useTheme();
  const [open, setIsOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [word, setWord] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);

  const handleSave = async () => {
    setSaving(true);
    const added = await onAdd(word);
    setSaving(false);
    if (added) wait().then(() => setIsOpen(false));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSave();
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <span className="sr-only">Menu</span>
            <MenuIcon size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => openNewTab(allPageURL)}>
            <ExternalLinkIcon size="14" className="mr-2" /> All words
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsOpen(true)}>
            <PlusCircleIcon size="14" className="mr-2" /> Add new words
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="text-red-600"
          >
            <Trash2Icon size="14" className="mr-2" /> Clear all words
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <Sun size="14" className="mr-2" /> Light mode
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <Moon size="14" className="mr-2" /> Dark mode
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            <Monitor size="14" className="mr-2" /> System mode
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={open} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Add new word</DialogTitle>
            <DialogDescription>
              Only supports adding to English words.
            </DialogDescription>
          </DialogHeader>
          <Input
            id="word"
            className="w-full"
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <DialogFooter>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="max-w-sm"
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              All words will be deleted after clicking delete.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => {
                setShowDeleteDialog(false);
                onDeleteAll();
              }}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default HeadActions;
