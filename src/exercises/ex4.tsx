import { getRow, getStrFromRow } from "./funcs";
export const ex4 = {
  id: 4,
  nextId: 5,
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
    task: `Покрась клетки последней строки как в первой строке!`,
    win: ({ data, exercise }) => {
      return Object.entries(exercise.sourceData).reduce((res, [key, cell]) => {
        const [colInd] = key.match(/\d/g);
        return res && cell.val === data[`G${colInd}`].val;
      }, true);
    }
  }
};
