import React from "react";

export const CellImage = ({ itemClass = "", itemStyle, val }) => {
  const y = val;
  return (
    <div
      className={`ex-11 sprite ${itemClass}`}
      style={{
        ...itemStyle,
        backgroundPositionY: y
      }}
    />
  );
};
