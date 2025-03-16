import React, { useState } from "react";

const DragDropList: React.FC = () => {
  const initialItems = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
  const [items, setItems] = useState<string[]>(initialItems);

  const handleDragStart = (index: number) => {
    // Store the index of the item being dragged
    return index;
  };

  const handleDrop = (index: number, draggedItemIndex: number) => {
    const newItems = [...items];
    // Remove the dragged item from its old position and insert it in the new position
    const [draggedItem] = newItems.splice(draggedItemIndex, 1);
    newItems.splice(index, 0, draggedItem);
    setItems(newItems);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Prevent default to allow drop
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-4">
        Drag and Drop List
      </h1>
      <ul className="rounded-md">
        {items.map((item, index) => (
          <li
            key={item}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", index.toString());
              handleDragStart(index);
            }}
            onDragOver={handleDragOver}
            onDrop={(e) => {
              const draggedItemIndex = parseInt(
                e.dataTransfer.getData("text/plain")
              );
              handleDrop(index, draggedItemIndex);
            }}
            className="flex items-center justify-between p-2 mb-2 border rounded cursor-move hover:bg-blue-50 transition duration-150"
          >
            <span>{item}</span>
            <span className="text-gray-400">↕️</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DragDropList;
