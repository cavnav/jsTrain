import { getRow, getStrFromRow } from "./funcs";
export const ex5 = {
  id: 5,
  nextId: 6,
  sourceData: {
    A1: {
      type: "color",
      val: "#FF0000"
    },
    A2: {
      type: "color",
      val: "#E46C0A"
    },
    A3: {
      type: "color",
      val: "#FFC000"
    },
    A4: {
      type: "color",
      val: "#92D050"
    },
    A5: {
      type: "color",
      val: "#93CDDD"
    },
    A6: {
      type: "color",
      val: "#0600FF"
    },
    A7: {
      type: "color",
      val: "#7B00FF"
    },
    C3: {
      type: "color",
      val: "#000000"
    },
    C4: {
      type: "color",
      val: "#000000"
    },
    C5: {
      type: "color",
      val: "#000000"
    },
    D4: {
      type: "color",
      val: "#000000"
    }
  },
  configData: {
    cell: {
      type: "color",
      val: "#FFFFFF"
    },
    grid: {
      cols: 7,
      rows: 7
    },
    task: `Покрась фигуру в один любой цвет`,
    win: ({ data }) => {
      const checkCellKeys = `C3 C4 C5 D4`.split(" ");
      const checkColors = checkCellKeys.reduce((res, cellKey) => {
        res = [...res, data[cellKey].val];
        return res;
      }, []);
      return (
        !"#FFFFFF #000000".includes(checkColors[0]) &&
        checkColors.every((color, ind, arr) => color === arr[0])
      );
    }
  }
};
