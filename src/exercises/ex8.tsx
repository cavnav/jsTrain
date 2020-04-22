import { getRow, getStrFromRow } from "./funcs";
export const ex8 = {
  id: 8,
  nextId: 9,
  sourceData: {
    A1: {
      type: "color",
      val: "#FF0000"
    },
    A3: {
      type: "color",
      val: "#FFFF00"
    },
    A6: {
      type: "color",
      val: "#0066CC"
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
    task: `Раскрась первую строку в цвета радуги: красный, оранжевый, желтый, зеленый, голубой, синий, фиолетовый.​\n
      Чтобы получить недостающие цвета, надо смешать имеющиеся:​\n
      Красный + Желтый = Оранжевый​\n
      Желтый + Синий = Зеленый​\n
      Белый + Синий = Голубой​\n
      Красный +KS Синий = Фиолетовый​.​`,
    win: ({ data }) => {
      const checkColors = `#FF0000#FF8000#FFFF00#80B366#80B3E6#0066CC#803366`;
      const dataRow = getStrFromRow({ rowName: "A", data, types: ["color"] });
      return dataRow === checkColors;
    }
  }
};
