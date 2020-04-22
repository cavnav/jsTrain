import { getRow, getStrFromRow } from "./funcs";
export const ex6 = {
  id: 6,
  nextId: 7,
  sourceData: {
    A1: {
      type: "color",
      val: "#FF0000"
    },
    A2: {
      type: "color",
      val: "#0000FF"
    },
    B1: {
      type: "color",
      val: "#FFFFFF"
    }
  },
  configData: {
    cell: {
      type: "color",
      val: "#00FF00"
    },
    grid: {
      cols: 7,
      rows: 7
    },
    style: xy => {
      const list = {
        A4: { borderLeft: "3px solid red", borderTop: "3px solid red" },
        A5: { borderTop: "3px solid red" },
        A6: { borderTop: "3px solid red" },
        A7: { borderTop: "3px solid red", borderRight: "3px solid red" },
        B7: { borderRight: "3px solid red" },
        C4: { borderLeft: "3px solid red", borderBottom: "3px solid red" },
        C5: { borderBottom: "3px solid red" },
        C6: { borderBottom: "3px solid red" },
        C7: { borderBottom: "3px solid red", borderRight: "3px solid red" },
        B4: { borderLeft: "3px solid red" }
      };
      return list[xy];
    },
    task: `Закрась красный прямоугольник, чтобы получился флаг России.​`,
    win: ({ data }) => {
      const whiteCells = `A4 A5 A6 A7`.split(" ");
      const blueCells = `B4 B5 B6 B7`.split(" ");
      const redCells = `C4 C5 C6 C7`.split(" ");

      function checkColors({ cells, checkColor }) {
        const colors = cells.reduce((res, cellKey) => {
          res = [...res, data[cellKey].val];
          return res;
        }, []);

        return (
          checkColor.includes(colors[0]) &&
          colors.every((color, ind, arr) => color === arr[0])
        );
      }

      return (
        checkColors({ cells: whiteCells, checkColor: "#FFFFFF" }) &&
        checkColors({ cells: blueCells, checkColor: "#0000FF" }) &&
        checkColors({ cells: redCells, checkColor: "#FF0000" })
      );
    }
  }
};
