interface Exercise {
  id: number;
  nextId: number;
  sourceData: {
    [type: string]: {
      type: string;
      val: any;
      str: string;
    };
  };
  configData: {
    cell: {
      type: string;
      val: any;
    };
    grid: {
      cols: number;
      rows: number;
    };
    task: string;
    win: () => {};
  };
}

export const getRow = ({ rowName, str, i = 1, type = "txt" }) => {
  // output: { A1: "h", A2: "e", A3: "y" }.
  let res = {};
  return (
    [...str].map((val, j) => (res[rowName + (i + j)] = { type, val })) && res
  );
};

export const getStrFromRow = ({ rowName, data, types = [] }) => {
  let res = [];
  let row = Object.keys(data).filter(row => row.includes(rowName));
  return (
    row
      .filter(cell => ["txt", ...types].includes(data[cell].type))
      .map((cell, j) => (res = [...res, data[cell].val])) &&
    res.slice(1).join("")
  );
};

export const compileSourceData = ({
  exercises,
  compiler
}: {
  exercises: { [type: string]: Exercise };
  compiler: () => {};
}): { [type: string]: Exercise } => {
  let newExercises = {};
  return (
    Object.keys(exercises).map(exName => {
      newExercises[exName] = {
        ...exercises[exName],
        sourceData: compiler
          ? compiler()
          : compile(exercises[exName].sourceData),
        configData: {
          cellWin: () => {},
          timeout: () => {},
          commandControl: () => true,
          onEval: ({ res }) => res,
          ...exercises[exName].configData
        }
      };
    }) && newExercises
  );

  function combineData({ def, source }) {
    const combined = Object.entries(def).reduce((res, [key, defVal]) => {
      res[key] = source[key] || defVal;
      return res;
    }, {});
    return {
      ...source,
      ...combined
    };
  }
  // -------
  function compile(rows) {
    let newRows = {};
    return (
      Object.keys(rows).map(rowName => {
        if (rowName.match(/\d/)) {
          newRows[rowName] = { ...rows[rowName] };
        } else {
          newRows = { ...newRows, ...getRow({ rowName, ...rows[rowName] }) };
        }
      }) && newRows
    );
  }
};
