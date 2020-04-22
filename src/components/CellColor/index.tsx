import React from "react";

export const CellColor = ({ itemClass, itemStyle, val }) => {
  return (
    <div className={itemClass} style={{ ...itemStyle, background: val }} />
  );
};
