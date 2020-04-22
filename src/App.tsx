import React from "react";
import { Grid } from "./components/";
import "antd/dist/antd.css";
import "./styles.css";

export class App extends React.Component {
  state = {};

  render() {
    const {} = this.props;
    return (
      <div>
        <Grid />
      </div>
    );
  }
}
