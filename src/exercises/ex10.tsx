export const ex10 = {
  id: 10,
  sourceData: {
    A2: {
      type: "color",
      val: "#008000"
    },
    E5: {
      type: "color",
      val: "#ffff00"
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
    task: `Перекрась клетки A2 и Е5, так чтобы A2 была желтой, а Е5 была зеленой.
            Без использования третьей клетки.`,
    win: ({ data, command }) => {
      const check = {
        A2: "#ffff00",
        E5: "#008000"
      };
      const res = Object.keys(check).map(i => {
        return data[i].val === check[i];
      });
      return !res.includes(false);
    },
    commandControl: ({ command }) => {
      return !!command.replace(/\s/g, "").match(/\bA2=\b|\bE5=\b/);
    }
  }
};
