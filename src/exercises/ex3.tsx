import { getRow, getStrFromRow } from "./funcs";
export const ex3 = {
  id: 3,
  nextId: 4,
  sourceData: {
    A: {
      str: "2*2=5"
    },
    B: {
      str: "3*3=20"
    },
    C: {
      str: "16=3*4"
    },
    D: {
      str: "1=200"
    },
    E: {
      str: "1=0*0"
    }
  },
  configData: {
    cell: {
      type: "color",
      val: "#ffffff"
    },
    grid: {
      cols: 7,
      rows: 7
    },
    task: `Добейся равенства в каждой строке!`,
    win: ({ data }) => {
      const rowNames = Object.keys(
        Object.keys(data).reduce((res, key, ind) => {
          const [liter] = key.match(/\D+/g);
          res[liter] = 1;
          return res;
        }, {})
      ).filter(liter => !["col", "_"].includes(liter));

      return rowNames.reduce((res, rowName) => {
        const dataRow = getStrFromRow({ rowName, data });
        const [leftSide, rightSide] = dataRow.split("=");
        return res && eval(leftSide) === eval(rightSide);
      }, true);
    }
  }
};
