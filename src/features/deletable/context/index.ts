"use client";

import { createContext } from "react";

type DeletableContextValue = {
  isSelectable: boolean;
  setIsSelectable: (isSelectable: boolean) => void;
  selectedItems: string[];
  addSelectedItem: (id: string) => void;
  removeSelectedItem: (id: string) => void;
  onDeleteItems: (id: string[]) => void;
};

export const DeletableContext = createContext<DeletableContextValue>({
  isSelectable: false,
  setIsSelectable: () => {},
  selectedItems: [],
  addSelectedItem: () => {},
  removeSelectedItem: () => {},
  onDeleteItems: () => {},
});
