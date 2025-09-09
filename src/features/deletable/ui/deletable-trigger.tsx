import React, { PropsWithChildren, useContext } from "react";
import { DeletableContext } from "../context";
import { Button } from "@/shared/components/ui/button";

export const DeletableTrigger: React.FC<PropsWithChildren> = ({ children }) => {
  const { isSelectable, setIsSelectable, onDeleteItems, selectedItems } =
    useContext(DeletableContext);

  const onDeleteSelected = () => {
    setIsSelectable(false);
    onDeleteItems(selectedItems);
  };

  if (isSelectable) {
    return (
      <>
        <Button variant="secondary" onClick={() => setIsSelectable(false)} data-testid="cancel-selecting-button">
          Cancel
        </Button>
        <Button onClick={onDeleteSelected} disabled={!selectedItems.length} data-testid="delete-selected-button">
          Delete
          {!!selectedItems.length && (
            <span className="block w-4 h-4 ml-2 text-xs rounded-full bg-secondary text-primary" data-testid="selected-length">
              {selectedItems.length}
            </span>
          )}
        </Button>
      </>
    );
  }

  return (
    <div>
      <Button
        onClick={() => setIsSelectable(true)}
        asChild
        data-testid="start-selection-button"
      >
        {children}
      </Button>
    </div>
  );
};
