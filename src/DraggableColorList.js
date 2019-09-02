import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import DragableColorBox from "./DragableColorBox";

const DraggableColorList = SortableContainer(({ colors, deleteColor }) => {
  return (
    <div style={{ height: "100%" }}>
      {colors.map((color, i) => (
        <DragableColorBox
          index={i}
          key={color.name}
          color={color.color}
          name={color.name}
          deleteColor={() => deleteColor(color.name)}
        />
      ))}
    </div>
  );
});

export default DraggableColorList;
