import {
  PropsWithChildren,
  cloneElement,
  isValidElement,
  useContext,
} from "react";
import { DeletableContext } from "../context";
import { cn } from "@/shared/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Button } from "@/shared/components/ui/button";
import { Trash } from "lucide-react";
import { PopoverClose } from "@radix-ui/react-popover";

interface DeletableItemProps {
  id: number;
  className?: string;
}

export const DeletableItem: React.FC<PropsWithChildren<DeletableItemProps>> = ({
  id,
  className,
  children,
}) => {
  const {
    isSelectable,
    onDeleteItems,
    selectedItems,
    addSelectedItem,
    removeSelectedItem,
  } = useContext(DeletableContext);
  const isSelected =
    selectedItems.find((selectedId) => selectedId === id) !== undefined;

  if (isValidElement<{ isDisabled: boolean }>(children)) {
    children = cloneElement(children, { isDisabled: isSelected });
  }

  const onSetSelectedItem = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    
    if (isSelected) {
      removeSelectedItem(id);
    } else {
      addSelectedItem(id);
    }
  };

  const onDeleteConfirm = () => onDeleteItems([id]);

  return (
    <div className={cn("relative w-min group", className)}>
      {isSelectable ? (
        <div
          onClick={onSetSelectedItem}
          className={cn(
            "absolute top-0 left-0 w-full h-full rounded-lg bg-black opacity-0 hover:opacity-15 transition-opacity",
            isSelected && "opacity-25 hover:opacity-25"
          )}
          data-testid="select-button"
        />
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              size="icon"
              variant="destructive"
              className="absolute -top-2 -right-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              data-testid="delete-button"
            >
              <Trash className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-min space-y-2 p-1" data-testid="popover">
            <p className="text-sm text-center">Delete this?</p>
            <div className="flex space-x-2">
              <PopoverClose asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  data-testid="cancel-deleting-button"
                >
                  No
                </Button>
              </PopoverClose>
              <Button
                size="sm"
                variant="destructive"
                onClick={onDeleteConfirm}
                data-testid="confirm-deleting-button"
              >
                Yes
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
      {children}
    </div>
  );
};
