import { getRow, getStrFromRow } from "./funcs";
export const ex7 = {
  id: 7,
  nextId: 8,
  sourceData: {
    A1: {
      type: "color",
      val: "#FF0000"
    },
    A2: {
      type: "color",
      val: "#0066CC"
    },
    B1: {
      type: "color",
      val: "#FFFFFF"
    }
  },
  configData: {
    cell: {
      type: "color",
      val: "#929292"
    },
    grid: {
      cols: 7,
      rows: 7
    },
    style: xy => {
      const list = {
        D4: {
          borderLeft: "3px solid red",
          borderTop: "3px solid red",
          borderRight: "3px solid red"
        },
        E4: { borderLeft: "3px solid red", borderRight: "3px solid red" },
        F4: { borderLeft: "3px solid red", borderRight: "3px solid red" },
        G4: {
          borderLeft: "3px solid red",
          borderBottom: "3px solid red",
          borderRight: "3px solid red"
        },
        A6: {
          borderLeft: "3px solid red",
          borderTop: "3px solid red",
          borderRight: "3px solid red"
        },
        B6: { borderLeft: "3px solid red", borderRight: "3px solid red" },
        C6: { borderLeft: "3px solid red", borderRight: "3px solid red" },
        D6: {
          borderLeft: "3px solid red",
          borderBottom: "3px solid red",
          borderRight: "3px solid red"
        }
      };
      return list[xy];
    },
    task: `Если смешать белый и синий цвета, получится голубой.​ \n
            Закрась 4-ый столбик в фиолетовый цвет, а шестой - в голубой.​`,
    win: ({ data }) => {
      const fourthCol = `D4 E4 F4 G4`.split(" ");
      const sixthCol = `A6 B6 C6 D6`.split(" ");

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
        checkColors({ cells: fourthCol, checkColor: "#803366" }) &&
        checkColors({ cells: sixthCol, checkColor: "#80B3E6" })
      );
    }
  }
};
