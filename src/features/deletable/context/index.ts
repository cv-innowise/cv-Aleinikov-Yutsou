import { createContext } from "react";

type DeletableContextValue = {
  isSelectable: boolean;
  setIsSelectable: (isSelectable: boolean) => void;
  selectedItems: number[];
  addSelectedItem: (id: number) => void;
  removeSelectedItem: (id: number) => void;
  onDeleteItems: (id: number[]) => void;
};

export const DeletableContext = createContext<DeletableContextValue>({
  isSelectable: false,
  setIsSelectable: () => {},
  selectedItems: [],
  addSelectedItem: () => {},
  removeSelectedItem: () => {},
  onDeleteItems: () => {},
});
