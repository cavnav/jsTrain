export const ex1 = {
  id: 1,
  nextId: 11,
  sourceData: {
    D4: {
      type: "color",
      val: "#000000"
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
    task: `Узнай, что находится в черной клетке?\n
      Важно помнить, что названия строк должны писаться с большой буквы, например, "A1" вместо "a1".\n
      Также следи, чтобы не перепутать русскую и английскую букву "C".`,
    win: ({ data, command }) => {
      return command === "#000000";
    }
  }
};
