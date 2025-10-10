"use client";

import React, { PropsWithChildren, useContext } from "react";
import { DeletableContext } from "../context";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { useTranslations } from "next-intl";

interface DeletableTriggerProps {
  className?: string;
}

export const DeletableTrigger: React.FC<
  PropsWithChildren<DeletableTriggerProps>
> = ({ className, children }) => {
  const { isSelectable, setIsSelectable, onDeleteItems, selectedItems } =
    useContext(DeletableContext);
  const t = useTranslations("deletable");

  const onDeleteSelected = () => {
    setIsSelectable(false);
    onDeleteItems(selectedItems);
  };

  if (isSelectable) {
    return (
      <div className={cn("space-x-2", className)}>
        <Button
          variant="secondary"
          onClick={() => setIsSelectable(false)}
          data-testid="cancel-selecting-button"
        >
          {t("cancel")}
        </Button>
        <Button
          onClick={onDeleteSelected}
          disabled={!selectedItems.length}
          data-testid="delete-selected-button"
        >
          {t("delete")}
          {!!selectedItems.length && (
            <span
              className="block w-4 h-4 ml-2 text-xs rounded-full bg-secondary text-primary"
              data-testid="selected-length"
            >
              {selectedItems.length}
            </span>
          )}
        </Button>
      </div>
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
