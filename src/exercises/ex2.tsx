import { getStrFromRow } from "./funcs";
export const ex2 = {
  id: 2,
  nextId: 3,
  sourceData: {
    A: {
      str: "ро?"
    },
    B: {
      str: "?ара"
    },
    C: {
      str: "ба?ан"
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
    className: {
      cellWin: "ex-2 guess-word"
    },
    style: xy => {
      const list = {
        A1: { color: "red" },
        A2: { color: "red" },
        B2: { color: "red" },
        B3: { color: "red" },
        B4: { color: "red" },
        C1: { color: "red" },
        C2: { color: "red" },
        C4: { color: "red" },
        C5: { color: "red" }
      };
      return list[xy];
    },
    task: `Отгадай слова по горизонтали.\n
      Чтобы записать в клетку буквы или символы надо использовать кавычки, например, "привет!".`,
    check: {
      A: {
        str: "рот"
      },
      B: {
        str: "кара"
      },
      C: {
        str: "баран"
      }
    },
    cellWin: function({ data, xy }) {
      const check = this.check;
      const [rowName, colName] = xy;
      if (colName == 0 || !check[rowName]) return;
      const checkRow = check[rowName].str;
      const dataRow = getStrFromRow({ rowName, data });
      return checkRow.toUpperCase() === dataRow.toUpperCase();
    },
    win: function({ data, command }) {
      const check = this.check;
      const error = Object.keys(check).find(
        rowName => !this.cellWin({ data, xy: [rowName] })
      );
      return error ? false : true;
    }
  }
};
