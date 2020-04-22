import React from "react";
import { Cell, Task } from "../";
import Color from "color";
import "./style.css";
import * as exercisesObj from ".../../../src/exercises";
import { compileSourceData } from "../../../src/exercises/funcs";

let exercises = Object.values(compileSourceData({ exercises: exercisesObj }));
const colorsSubtractionMap = {};

export class Grid extends React.Component {
  state = this.getData();

  getClassNameToWinCase = ({ xy }) => {
    const { data } = this.state;
    const {
      configData,
      configData: { className = {} }
    } = this.state.exercise;
    return (
      configData.cellWin({
        data,
        xy
      }) && className.cellWin
    );
  };

  render() {
    const { exercise } = this.state;
    const { configData } = exercise;
    const { style, grid } = configData;
    const data = Object.entries(this.state.data);

    return (
      <div className="container flex">
        <div
          id="grid"
          style={{
            width: (grid.cols + 1) * 40,
            minWidth: (grid.cols + 1) * 40,
            height: "min-content"
          }}
          className={`gridTeplateRows-${grid.rows +
            1} gridTemplateColumns-${grid.cols + 1}`}
        >
          {data.map(([xy, i], ind) => {
            const CellX = Cell[i.type];
            return (
              <CellX
                key={ind}
                itemClass={`${xy} ${this.getClassNameToWinCase({ xy }) || ""}`}
                itemStyle={style && style(xy)}
                val={i.val}
              />
            );
          })}
        </div>
        <div className="exercise">
          <div>
            <input
              value={this.state.command}
              onKeyDown={this.onKeyDown}
              onChange={this.onChangeCommand}
            />
            <a onClick={this.onRestart}> Начать заново</a>
          </div>
          <Task text={exercise.configData.task} />
          {this.state.isWin && (
            <div style={{ fontSize: "30px" }}>
              Успех!!!
              <br />
              {this.state.exercise.nextId ? (
                <a onClick={this.onNextEx}>Следующее упражнение</a>
              ) : (
                "Поздравляю победителя )"
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  onRestart = () => {
    const ex = this.state.exercise;
    const exUpd = compileSourceData({
      exercises: { someEx: ex },
      compiler: ex.sourceDataCompiler
    }).someEx;
    const indUpd = exercises.findIndex(i => i.id === ex.id);
    exercises[indUpd] = exUpd;
    this.setState(() => this.getData(ex.id));
    setTimeout(() =>
      this.state.exercise.configData.timeout({
        actionId: "onRestart"
      })
    );
  };

  onNextEx = () => {
    this.setState(state => this.getData(state.exercise.nextId));
    setTimeout(() => {
      this.state.exercise.configData.timeout({
        actionId: "onInit"
      });
    });
  };

  getData(exId = 1) {
    const exercise = exercises.find(e => e.id === exId);
    let data = {};
    let grid = exercise.configData.grid;
    let cell = exercise.configData.cell;
    let rows = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, grid.cols);
    let cols = "123456789".slice(0, grid.rows);

    // Задать значения таблицы и наименования строк.
    [...rows].map(row => {
      data[row + "0"] = {
        type: "txt",
        val: row
      };

      [...cols].map(col => {
        data[row + col] = {
          type: cell.type,
          val: cell.val
        };
      });
    });

    // Задать наименования столбцов.
    let firstRowCells = {};
    [...cols].map(
      col => (firstRowCells["col" + col] = { type: "txt", val: col })
    );

    data = {
      ...{ _: { type: "txt", val: "" } },
      ...firstRowCells,
      ...data,
      ...exercise.sourceData
    };

    return {
      command: "",
      address: "",
      data,
      exercise,
      isWin: false
    };
  }

  ifWin = () => {
    return this.state.exercise.configData.win(this.state);
  };

  onChangeCommand = command => {
    this.setState({
      command: command.target.value
    });
  };

  onKeyDown = e => {
    const { data, command = "", exercise } = this.state;
    const { commandControl } = exercise.configData;
    const [, address] = ("" + command).match(/(\w+\d+).*=/) || [];
    let myEval;

    if (e.key !== "Enter") {
      return;
    }

    try {
      myEval = this.myEval({ context: data, address, js: command });
    } catch (e) {
      this.setState({
        command: "ошибка"
      });
      return;
    }

    myEval = exercise.configData.onEval({ res: myEval, js: command });

    if (!address) {
      this.setState({
        command: myEval
      });

      setTimeout(() =>
        this.setState({
          isWin: this.ifWin()
        })
      );

      return;
    }

    if (!commandControl({ command, address })) return;

    this.setState({
      data: {
        ...data,
        ...{
          [address]: {
            ...data[address],
            type: this.getCellType(myEval),
            val: myEval
          }
        }
      },
      command: myEval
    });

    setTimeout(() =>
      this.setState({
        isWin: this.ifWin()
      })
    );
  };

  getCellType = val => {
    const types = {
      "#": "color",
      default: "txt"
    };
    let type = val.constructor.name;
    if (type === "String" && val[0] === "#") {
      type = "#";
    }
    return types[type] || types.default;
  };

  myEval = ({ context, address, js }) => {
    let keys = Object.keys(context);
    let vals = Object.values(context).map(i => {
      return i.val.constructor === String ? `"${i.val}"` : i.val;
    });
    let evalContext = keys.reduce((res, next, i) => {
      res += `var ${next}=${vals[i]};\n`;
      return res;
    }, "");

    let colorsLib = Color;
    let colorsSubMap = colorsSubtractionMap;
    let res = "";
    let expression =
      ((`${js}`.replace(/ /g, "").match(/=.+/) || [])[0] || "").slice(1) ||
      `${js}`;
    // Если числа, то сразу ответ.
    res += `let res = eval('${expression}');
    console.log(res);
    // Если цвета складываются.
    if (res.constructor === String && res[0] === '#') {   
      console.log('res2');   
      let [a, b] = res.replace(/ /g, '').match(/#[\\w\\d]+/g);
      if (a && !b) { res = a; }
      else if (a && b) { 
        res = colorsLib(a).mix(colorsLib(b)).hex();   
        colorsSubMap[address] = {
          ['-'+b]: a,
          ['-'+a]: b
        };
      }
    }
    // Если цвета вычитаются.
    else if (isNaN(res) && res.constructor === Number) {
      let [a, b] = '${expression}'.replace(/ /g, '').split('-');
      res = colorsSubMap[a]['-' + eval(b)]; 
    }
    res; \n`;

    return eval(evalContext + res);
  };
}
