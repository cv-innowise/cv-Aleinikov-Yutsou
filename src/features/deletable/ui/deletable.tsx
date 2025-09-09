import React, { PropsWithChildren, useState } from 'react'
import { DeletableContext } from '../context';

interface DeletableProps {
  onDeleteItems: (ids: number[]) => void;
}

export const Deletable: React.FC<PropsWithChildren<DeletableProps>> = ({onDeleteItems, children}) => {
    const [isSelectable, setIsSelectable] = useState(false);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const addSelectedItem = (id: number) => {
      setSelectedItems([...selectedItems, id]);
    };

    const removeSelectedItem = (id: number) => {
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
}
