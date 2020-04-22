import React from "react";

export const CellTxt = ({ itemClass, itemStyle, val }) => {
  return (
    <div className={itemClass} style={{ ...itemStyle, background: "white" }}>
      {val}
    </div>
  );
};
