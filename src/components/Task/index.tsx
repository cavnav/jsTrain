import React from "react";

export const Task = ({ text }) => {
  return (
    <div>
      <div>Задание:</div>
      {text
        .split("\n")
        .filter(item => item)
        .map((item, ind) => (
          <div key={ind}>{item}</div>
        ))}
    </div>
  );
};
