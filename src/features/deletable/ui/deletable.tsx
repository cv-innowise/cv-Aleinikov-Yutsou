"use client";

import { useState } from "react";
import { DeletableContext } from "../context";


interface DeletableProps {
  onDeleteItems: (ids: string[]) => void;
  children: React.ReactNode;
}

export const Deletable = ({
  onDeleteItems,
  children,
}: DeletableProps) => {
  const [isSelectable, setIsSelectable] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const addSelectedItem = (id: string) => {
    setSelectedItems([...selectedItems, id]);
  };

  const removeSelectedItem = (id: string) => {
    setSelectedItems(selectedItems.filter((itemId) => id !== itemId));
  };

  const onSetIsSelectable = (isSelectable: boolean) => {
    setSelectedItems([]);
    setIsSelectable(isSelectable);
  };
  return (
    <DeletableContext
      value={{
        isSelectable,
        selectedItems,
        addSelectedItem,
        removeSelectedItem,
        onDeleteItems,
        setIsSelectable: onSetIsSelectable,
      }}
    >
      {children}
    </DeletableContext>
  );
};
