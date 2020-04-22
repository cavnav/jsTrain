const numRows = 4;

export const ex11 = {
  id: 11,
  nextId: 2,
  sourceData: sourceDataCompiler(),
  sourceDataCompiler,
  configData: {
    evalData: {
      imgPrev: {}
    },
    cell: {
      type: "color",
      val: "#ffffff"
    },
    grid: {
      cols: numRows,
      rows: numRows
    },
    timeout: function({ actionId, context }) {
      const actions = {
        onInit: hideImagesAfterSecs,
        onRestart: onRestart.call(this),
        default: () => {}
      };
      const action = actions[actionId] || actions.default;

      action();
    },
    commandControl: ({ command, address }) => {
      return command.includes("=") ? false : true;
    },
    task: `Открой все парные картинки.`,
    win: function temp({ data, command }) {
      const numOpenedPairs = Object.values(this.openedPairs).length;
      return numOpenedPairs === numRows * numRows;
    },
    openedPairs: {},
    onEval: function temp({ js, res }) {
      const [address] = js.match(/\w+\d+/) || [];
      // Если вычисление или присвоение.
      if (!address || js.includes("=")) return res;
      // Если адрес соответствует адресу картинки из открытой пары.)
      if (this.openedPairs[address]) return address;

      const imgNextY = res;
      const imgNextClass = getElemClass({ js });
      showImages({ elemClasses: [imgNextClass] });
      const { imgPrev } = this.evalData;
      if (!imgPrev.y) {
        this.evalData.imgPrev = { class: imgNextClass, y: imgNextY };
      } else if (imgPrev.y === imgNextY) {
        this.openedPairs[imgPrev.class] = 1;
        this.openedPairs[imgNextClass] = 1;
        this.evalData.imgPrev = {};
      } else {
        this.evalData.imgPrev = {};
        hideImages({ elemClasses: [imgPrev.class, imgNextClass], val: "none" });
      }
      return "";

      // -----------------------------------------------------------------
      function getElemClass({ js }) {
        return (js.match(/\w+\d+\b/) || []).slice(0, 1)[0];
      }
    }
  }
};

function setCssProp({ elemClasses, key, val }) {
  elemClasses
    .filter(cls => cls)
    .forEach(cls => {
      const [elem] =
        document.getElementsByClassName(`ex-11 sprite ${cls}`) || [];
      elem && (elem.style[key] = val);
    });
}

function showImages({ elemClasses }) {
  setCssProp({
    elemClasses,
    key: "backgroundImage",
    val: "url(ex11.png)"
  });
}

function hideImages({ elemClasses, val = "", timer = 500 }) {
  setTimeout(
    () => setCssProp({ elemClasses, key: "backgroundImage", val }),
    timer
  );
}

function hideImagesAfterSecs({ elemClass } = {}) {
  setTimeout(() => {
    changeCssRule({ elemClass, key: "backgroundImage", val: "none" });
  }, 5000);
}

function showImagesAndHide({ elemClass } = {}) {
  setTimeout(() => {
    hideImages({ elemClasses: Object.keys(ex11.sourceData), timer: 0 });
    changeCssRule({ elemClass, key: "backgroundImage", val: "url(ex11.png)" });
    hideImagesAfterSecs({ elemClass });
  });
}

function changeCssRule({ elemClass = ".ex-11.sprite", key, val }) {
  Object.values(document.styleSheets[0].cssRules).find(i =>
    i.selectorText.includes(elemClass)
  ).style[key] = val;
}

function onRestart() {
  this.openedPairs = {};
  this.evalData.imgPrev = {};
  showImagesAndHide();
}

function sourceDataCompiler() {
  const randomedData = getRandomImageY();
  const rowCodes = "ABCDEFGHIJKLMNOPQRSTXWYZ".slice(0, numRows).split("");
  const cols = "123456789".slice(0, numRows).split("");
  let res = {};
  let dataInd = 0;
  rowCodes.forEach(rowCode => {
    cols.forEach(col => {
      res[`${rowCode}${col}`] = {
        type: "image",
        val: randomedData[dataInd++]
      };
    });
  });

  return res;

  // =====================================================================
  function getRandomImageY() {
    const y = getSeq({ x: 0, d: -58, max: -4060 });

    const randomed = randomArrElems({ arr: y }).slice(
      0,
      (numRows * numRows) / 2
    );

    return randomArrElems({ arr: [...randomed, ...randomed] });

    // ====================================================
    function randomArrElems({ arr }) {
      return arr.reduceRight((randomed, val, ind, arr) => {
        const randomInd = Math.floor(Math.random() * ind);
        randomed.push(arr[randomInd]);
        arr[randomInd] = arr[ind];
        return randomed;
      }, []);
    }

    function getSeq({ x, d, max, res = [] }) {
      return x === max
        ? res
        : getSeq({
            x: x + d,
            d,
            max,
            res: [...res, x + d]
          });
    }
  }
}
